"use server";

import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
	insertQuestionSchema,
	questions,
	questionVotes,
	voteBatches,
} from "@/db/schema";

export async function fetchQuestions() {
	return db.select().from(questions).orderBy(questions.createdAt);
}
export async function fetchResults() {
	// total ballots U
	const [total_ballots] = await db
		.select({ U: sql<number>`count(*)`.mapWith(Number) })
		.from(voteBatches);

	if (!total_ballots) {
		throw new Error("No votes found");
	}
	const U = total_ballots.U;

	// maximum possible position (max k_i+1)
	const [{ maxPos }] = await db
		.select({ maxPos: sql<number>`max(cnt+1)`.mapWith(Number) })
		.from(
			sql`(
        select batch_id, count(*) as cnt
        from biohack_vote
        group by batch_id
      )`.as("sub"),
		);

	// aggregate per question
	return db
		.select({
			avgPos: sql<number>`avg(v.position)`.mapWith(Number),
			content: questions.content,
			id: questions.id,
			votes:
				sql<number>`sum(case when v.position<${maxPos} then 1 else 0 end)`.mapWith(
					Number,
				),
		})
		.from(questions)
		.leftJoin(questionVotes.as("v"), eq(sql`v.question_id`, questions.id))
		.groupBy(questions.id)
		.orderBy(
			// compute composite score inline
			sql<number>`
        (
          0.6 * (sum(case when v.position<${maxPos} then 1 else 0 end)/${U})
        +  0.4 * (1 - ((avg(v.position)-1)/${maxPos}))
        )
      `.desc(),
		);
}

const newQuestionSchema = insertQuestionSchema.pick({ content: true });

export async function createQuestion(content: string) {
	const parsed = newQuestionSchema.safeParse({ content });
	if (!parsed.success) {
		throw new Error(parsed.error.message);
	}
	const [record] = await db.insert(questions).values(parsed.data).returning();
	return record;
}

export async function submitVote(order: number[]) {
	const [batch] = await db.insert(voteBatches).values({}).returning();

	if (!batch) {
		throw new Error("Failed to create a new vote batch");
	}

	// count selections
	const k = order.length;
	// for each question, insert either its position or implicit last-place
	const rows = [];

	for (const [i, qId] of order.entries()) {
		rows.push({
			batchId: batch.id,
			position: i + 1,
			questionId: qId,
		});
	}

	// find all question IDs
	const allQs = await db.select({ id: questions.id }).from(questions);
	const implicitPos = k + 1;
	for (const q of allQs) {
		if (!order.includes(q.id)) {
			rows.push({
				batchId: batch.id,
				position: implicitPos,
				questionId: q.id,
			});
		}
	}
	await db.insert(questionVotes).values(rows);
	return { success: true };
}

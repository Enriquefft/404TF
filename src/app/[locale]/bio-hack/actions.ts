"use server";

import { eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
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
	const [totalBallots] = await db
		.select({ U: sql<number>`count(*)`.mapWith(Number) })
		.from(voteBatches);

	if (!totalBallots) {
		throw new Error("No votes found");
	}
	const U = totalBallots.U;

	// maximum possible position (max k_i+1)
	const maxPosRes = await db
		.select({ maxPos: sql<number>`max(cnt + 1)`.mapWith(Number) })
		.from(
			db
				.select({
					batchId: questionVotes.batchId,
					cnt: sql<number>`count(*)`.mapWith(Number),
				})
				.from(questionVotes)
				.groupBy(questionVotes.batchId)
				.as("sub"),
		);
	const maxPos = maxPosRes[0]?.maxPos ?? 1;

	const v = alias(questionVotes, "v");

	const rows = await db
		.select({
			avgPos: sql<number>`avg(${v.position})`.mapWith(Number),
			content: questions.content,
			id: questions.id,
			votes:
				sql<number>`sum(case when ${v.position} < ${maxPos} then 1 else 0 end)`.mapWith(
					Number,
				),
		})
		.from(questions)
		.leftJoin(v, eq(v.questionId, questions.id))
		.groupBy(questions.id);

	const alpha = 0.6;
	const results = rows
		.map((r) => {
			const approval = r.votes / U;
			const priority = 1 - (r.avgPos - 1) / maxPos;
			const score = alpha * approval + (1 - alpha) * priority;
			return { ...r, score };
		})
		.sort((a, b) => b.score - a.score);

	return { maxPos, results, U };
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
	const rows: (typeof questionVotes.$inferInsert)[] = [];

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

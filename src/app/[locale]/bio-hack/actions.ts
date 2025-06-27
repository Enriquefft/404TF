"use server";

import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { insertQuestionSchema, questions, questionVotes } from "@/db/schema";

export async function fetchQuestions() {
	return db.select().from(questions).orderBy(questions.createdAt);
}

export async function fetchResults() {
	return db
		.select({
			content: questions.content,
			id: questions.id,
			pos: sql<number>`avg(${questionVotes.position})`.mapWith(Number),
			votes: sql<number>`count(${questionVotes.id})`.mapWith(Number),
		})
		.from(questions)
		.leftJoin(questionVotes, eq(questionVotes.questionId, questions.id))
		.groupBy(questions.id)
		.orderBy(
			sql`avg(${questionVotes.position}) nulls last`,
			desc(sql`count(${questionVotes.id})`),
			questions.createdAt,
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
	if (!Array.isArray(order)) throw new Error("Invalid order");
	const rows = order.map((id, idx) => ({ position: idx, questionId: id }));
	if (rows.length) await db.insert(questionVotes).values(rows);
	return { success: true };
}

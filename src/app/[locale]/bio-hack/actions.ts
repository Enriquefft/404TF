"use server";

import { db } from "@/db";
import { insertQuestionSchema, questions, questionVotes } from "@/db/schema";
import { broadcastQuestion } from "@/lib/questionEvents";

export async function fetchQuestions() {
	return db.select().from(questions).orderBy(questions.createdAt);
}

const newQuestionSchema = insertQuestionSchema.pick({ content: true });

export async function createQuestion(content: string) {
	const parsed = newQuestionSchema.safeParse({ content });
	if (!parsed.success) {
		throw new Error(parsed.error.message);
	}
	const [record] = await db.insert(questions).values(parsed.data).returning();
	if (record) broadcastQuestion(record);
	return record;
}

export async function submitVote(order: number[]) {
	if (!Array.isArray(order)) throw new Error("Invalid order");
	const rows = order.map((id, idx) => ({ position: idx, questionId: id }));
	if (rows.length) await db.insert(questionVotes).values(rows);
	return { success: true };
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { insertQuestionSchema, questions } from "@/db/schema";
import { broadcastQuestion } from "@/lib/questionEvents";

export async function GET() {
	const data = await db.select().from(questions).orderBy(questions.createdAt);
	return NextResponse.json(data);
}

const newQuestionSchema = insertQuestionSchema.pick({ content: true });

export async function POST(request: Request) {
	const body = await request.json();
	const parsed = newQuestionSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error.message }, { status: 400 });
	}
	const [record] = await db.insert(questions).values(parsed.data).returning();
	if (record) {
		broadcastQuestion(record);
		return NextResponse.json(record);
	}
	return NextResponse.json({ error: "Insert failed" }, { status: 500 });
}

import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { questions, questionVotes } from "@/db/schema";

export const dynamic = "force-dynamic";

async function getResults() {
	return db
		.select({
			id: questions.id,
			content: questions.content,
			votes: sql<number>`count(${questionVotes.id})`.mapWith(Number),
		})
		.from(questions)
		.leftJoin(questionVotes, eq(questionVotes.questionId, questions.id))
		.groupBy(questions.id)
		.orderBy(desc(sql`count(${questionVotes.id})`), questions.createdAt);
}

export async function GET(request: Request) {
	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const encoder = new TextEncoder();

	async function send() {
		const rows = await getResults();
		writer.write(encoder.encode(`data: ${JSON.stringify(rows)}\n\n`));
	}

	await send();
	const timer = setInterval(send, 3000);

	request.signal.addEventListener("abort", () => {
		clearInterval(timer);
		writer.close();
	});

	return new NextResponse(readable, {
		headers: {
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
			"Content-Type": "text/event-stream",
		},
	});
}

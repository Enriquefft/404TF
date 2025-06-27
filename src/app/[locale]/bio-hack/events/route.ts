import { desc, gt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { questions } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const encoder = new TextEncoder();

	const [latest] = await db
		.select()
		.from(questions)
		.orderBy(desc(questions.id))
		.limit(1);
	let lastId = latest?.id ?? 0;

	async function sendNew() {
		const rows = await db
			.select()
			.from(questions)
			.where(gt(questions.id, lastId))
			.orderBy(questions.id);
		for (const row of rows) {
			lastId = row.id;
			const msg = `data: ${JSON.stringify(row)}\n\n`;
			writer.write(encoder.encode(msg));
		}
	}

	await sendNew();
	const timer = setInterval(sendNew, 3000);

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

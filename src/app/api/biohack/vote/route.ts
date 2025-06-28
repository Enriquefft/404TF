import { NextResponse } from "next/server";
import { db } from "@/db";
import { questionVotes, voteBatches } from "@/db/schema";

export async function POST(request: Request) {
	const { order } = await request.json();
	if (!Array.isArray(order)) {
		return NextResponse.json({ error: "Invalid order" }, { status: 400 });
	}
	const [batch] = await db.insert(voteBatches).values({}).returning();
	if (!batch) {
		return NextResponse.json(
			{ error: "Failed to create batch" },
			{ status: 500 },
		);
	}
	const rows = order.map((id: number, idx: number) => ({
		batchId: batch.id,
		position: idx + 1,
		questionId: id,
	}));
	if (rows.length) await db.insert(questionVotes).values(rows);
	return NextResponse.json({ success: true });
}

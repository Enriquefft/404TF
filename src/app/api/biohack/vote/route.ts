import { NextResponse } from "next/server";
import { db } from "@/db";
import { questionVotes } from "@/db/schema";

export async function POST(request: Request) {
  const { order } = await request.json();
  if (!Array.isArray(order)) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }
  const rows = order.map((id: number, idx: number) => ({
    questionId: id,
    position: idx,
  }));
  if (rows.length) await db.insert(questionVotes).values(rows);
  return NextResponse.json({ success: true });
}

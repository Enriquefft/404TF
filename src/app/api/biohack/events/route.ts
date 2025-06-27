import { NextResponse } from "next/server";
import { questionEvents } from "@/lib/questionEvents";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { readable, writable } = new TransformStream();
  const encoder = new TextEncoder();
  const send = (data: unknown) => {
    const msg = `data: ${JSON.stringify(data)}\n\n`;
    writable.getWriter().write(encoder.encode(msg));
  };
  questionEvents.on("new", send);
  request.signal.addEventListener("abort", () => {
    questionEvents.off("new", send);
    writable.getWriter().close();
  });
  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

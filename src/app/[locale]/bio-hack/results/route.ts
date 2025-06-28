import { NextResponse } from "next/server";
import { fetchResults } from "../actions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const encoder = new TextEncoder();

	async function send() {
		const data = await fetchResults();
		writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
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

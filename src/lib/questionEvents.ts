import { EventEmitter } from "node:events";
import type { SelectQuestion } from "@/db/schema";

export const questionEvents = new EventEmitter();

export function broadcastQuestion(question: SelectQuestion) {
	questionEvents.emit("new", question);
}

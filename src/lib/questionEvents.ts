import { EventEmitter } from "events";
import type { SelectQuestion } from "@/db/schema";

export const questionEvents = new EventEmitter();

export function broadcastQuestion(question: SelectQuestion) {
  questionEvents.emit("new", question);
}

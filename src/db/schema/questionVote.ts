import { sql } from "drizzle-orm";
import { integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { questions } from "./question.ts";
import { schema } from "./schema.ts";

export const voteBatches = schema.table("biohack_batch", {
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	id: serial("id").primaryKey(),
});

export const questionVotes = schema.table("biohack_vote", {
	batchId: integer("batch_id")
		.notNull()
		.references(() => voteBatches.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	id: serial("id").primaryKey(),
	position: integer("position").notNull(),
	questionId: integer("question_id")
		.notNull()
		.references(() => questions.id, { onDelete: "cascade" }),
});

export const insertQuestionVoteSchema = createInsertSchema(questionVotes);

export type InsertQuestionVote = typeof questionVotes.$inferInsert;

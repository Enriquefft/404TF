import { sql } from "drizzle-orm";
import { integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { schema } from "./schema.ts";
import { questions } from "./question.ts";

export const questionVotes = schema.table("biohack_vote", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertQuestionVoteSchema = createInsertSchema(questionVotes);

export type InsertQuestionVote = typeof questionVotes.$inferInsert;

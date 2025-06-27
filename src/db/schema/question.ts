import { sql } from "drizzle-orm";
import { index, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { schema } from "./schema.ts";

export const questions = schema.table(
  "biohack_question",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (q) => [index("created_idx").on(q.createdAt)]
);

export const insertQuestionSchema = createInsertSchema(questions);

export type InsertQuestion = typeof questions.$inferInsert;
export type SelectQuestion = typeof questions.$inferSelect;

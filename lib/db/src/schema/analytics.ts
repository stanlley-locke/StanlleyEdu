import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const analyticsTable = pgTable("analytics", {
  id: serial("id").primaryKey(),
  eventType: text("event_type", { enum: ["click_whatsapp", "click_telegram", "click_form", "click_registration"] }).notNull(),
  channel: text("channel").notNull(), // "hero", "footer", "navbar", "mentor"
  cohortId: serial("cohort_id").references(() => cohortsTable.id),
  ipHash: text("ip_hash"), // anonymized IP for distinct counting
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

import { cohortsTable } from "./cohorts";

export const insertAnalyticsSchema = createInsertSchema(analyticsTable).omit({ id: true, timestamp: true });
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analyticsTable.$inferSelect;

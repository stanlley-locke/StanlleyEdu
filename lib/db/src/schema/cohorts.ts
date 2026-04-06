import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const cohortsTable = pgTable("cohorts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g. "Software Bootcamp May 2024"
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  status: text("status", { enum: ["upcoming", "active", "completed", "closed"] }).notNull().default("upcoming"),
  registrationType: text("registration_type", { enum: ["internal", "external"] }).notNull().default("internal"),
  externalLink: text("external_link"), // Google Form link
  whatsappLink: text("whatsapp_link"), // WhatsApp group/channel
  telegramLink: text("telegram_link"),
  maxSeats: integer("max_seats").notNull().default(50),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCohortSchema = createInsertSchema(cohortsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCohort = z.infer<typeof insertCohortSchema>;
export type Cohort = typeof cohortsTable.$inferSelect;

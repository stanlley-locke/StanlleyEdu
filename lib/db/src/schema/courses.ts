import { pgTable, text, serial, timestamp, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  price: real("price").notNull().default(0),
  commitmentFee: real("commitment_fee").notNull().default(800),
  maxStudents: integer("max_students").notNull().default(30),
  enrolledCount: integer("enrolled_count").notNull().default(0),
  status: text("status").notNull().default("open"),
  imageUrl: text("image_url"),
  instructorName: text("instructor_name").notNull(),
  level: text("level").notNull().default("beginner"),
  technologies: text("technologies").array().notNull().default([]),
  outcomes: text("outcomes").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertCourseSchema = createInsertSchema(coursesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof coursesTable.$inferSelect;

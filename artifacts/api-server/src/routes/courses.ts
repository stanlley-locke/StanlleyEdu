import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, coursesTable, courseModulesTable } from "@workspace/db";
import { CreateCourseBody, UpdateCourseBody, GetCourseParams, UpdateCourseParams, DeleteCourseParams, ListCoursesQueryParams } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/courses", async (req, res): Promise<void> => {
  const params = ListCoursesQueryParams.safeParse(req.query);
  const status = params.success ? params.data.status : null;
  const category = params.success ? params.data.category : null;

  let courses = await db.select().from(coursesTable).orderBy(coursesTable.createdAt);

  if (status) courses = courses.filter(c => c.status === status);
  if (category) courses = courses.filter(c => c.category === category);

  const result = courses.map(c => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    shortDescription: c.shortDescription,
    category: c.category,
    duration: c.duration,
    startDate: c.startDate,
    endDate: c.endDate,
    price: c.price,
    commitmentFee: c.commitmentFee,
    maxStudents: c.maxStudents,
    enrolledCount: c.enrolledCount,
    status: c.status,
    imageUrl: c.imageUrl,
    instructorName: c.instructorName,
    level: c.level,
    createdAt: c.createdAt?.toISOString() ?? new Date().toISOString(),
  }));

  res.json(result);
});

router.post("/courses", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateCourseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { technologies, outcomes, ...rest } = parsed.data;
  const slug = rest.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();

  const [course] = await db.insert(coursesTable).values({
    ...rest,
    slug,
    technologies: technologies ?? [],
    outcomes: outcomes ?? [],
  }).returning();

  res.status(201).json({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    shortDescription: course.shortDescription,
    category: course.category,
    duration: course.duration,
    startDate: course.startDate,
    endDate: course.endDate,
    price: course.price,
    commitmentFee: course.commitmentFee,
    maxStudents: course.maxStudents,
    enrolledCount: course.enrolledCount,
    status: course.status,
    imageUrl: course.imageUrl,
    instructorName: course.instructorName,
    level: course.level,
    createdAt: course.createdAt?.toISOString() ?? new Date().toISOString(),
  });
});

router.get("/courses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid course ID" });
    return;
  }

  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, id)).limit(1);
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  const modules = await db
    .select()
    .from(courseModulesTable)
    .where(eq(courseModulesTable.courseId, id))
    .orderBy(courseModulesTable.order);

  res.json({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    shortDescription: course.shortDescription,
    category: course.category,
    duration: course.duration,
    startDate: course.startDate,
    endDate: course.endDate,
    price: course.price,
    commitmentFee: course.commitmentFee,
    maxStudents: course.maxStudents,
    enrolledCount: course.enrolledCount,
    status: course.status,
    imageUrl: course.imageUrl,
    instructorName: course.instructorName,
    level: course.level,
    createdAt: course.createdAt?.toISOString() ?? new Date().toISOString(),
    modules: modules.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      order: m.order,
      duration: m.duration,
    })),
    technologies: course.technologies ?? [],
    outcomes: course.outcomes ?? [],
  });
});

router.patch("/courses/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid course ID" });
    return;
  }

  const parsed = UpdateCourseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updates: Record<string, unknown> = {};
  const data = parsed.data;
  if (data.title != null) updates.title = data.title;
  if (data.description != null) updates.description = data.description;
  if (data.shortDescription != null) updates.shortDescription = data.shortDescription;
  if (data.status != null) updates.status = data.status;
  if (data.startDate != null) updates.startDate = data.startDate;
  if (data.endDate != null) updates.endDate = data.endDate;
  if (data.price != null) updates.price = data.price;
  if (data.commitmentFee != null) updates.commitmentFee = data.commitmentFee;
  if (data.maxStudents != null) updates.maxStudents = data.maxStudents;
  if (data.imageUrl != null) updates.imageUrl = data.imageUrl;

  const [course] = await db.update(coursesTable).set(updates as any).where(eq(coursesTable.id, id)).returning();
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  res.json({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    shortDescription: course.shortDescription,
    category: course.category,
    duration: course.duration,
    startDate: course.startDate,
    endDate: course.endDate,
    price: course.price,
    commitmentFee: course.commitmentFee,
    maxStudents: course.maxStudents,
    enrolledCount: course.enrolledCount,
    status: course.status,
    imageUrl: course.imageUrl,
    instructorName: course.instructorName,
    level: course.level,
    createdAt: course.createdAt?.toISOString() ?? new Date().toISOString(),
  });
});

router.delete("/courses/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid course ID" });
    return;
  }

  const [course] = await db.delete(coursesTable).where(eq(coursesTable.id, id)).returning();
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }

  res.json({ message: "Course deleted successfully" });
});

export default router;

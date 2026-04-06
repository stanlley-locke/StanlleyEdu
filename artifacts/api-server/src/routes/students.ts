import { Router, type IRouter } from "express";
import { eq, ilike, or, sql } from "drizzle-orm";
import { db, usersTable, registrationsTable, coursesTable } from "@workspace/db";
import { GetStudentParams, UpdateStudentParams, UpdateStudentBody, ListStudentsQueryParams } from "@workspace/api-zod";
import { requireAuth, requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/students", requireAdmin, async (req, res): Promise<void> => {
  const params = ListStudentsQueryParams.safeParse(req.query);
  const page = params.success && params.data.page ? Number(params.data.page) : 1;
  const limit = params.success && params.data.limit ? Number(params.data.limit) : 20;
  const offset = (page - 1) * limit;
  const status = params.success ? params.data.status : null;
  const search = params.success ? params.data.search : null;

  let query = db.select().from(usersTable).where(eq(usersTable.role, "student"));

  const students = await db
    .select()
    .from(usersTable)
    .where(
      or(
        status ? eq(usersTable.status, status) : undefined,
        search
          ? or(
              ilike(usersTable.firstName, `%${search}%`),
              ilike(usersTable.lastName, `%${search}%`),
              ilike(usersTable.email, `%${search}%`)
            )
          : undefined,
        eq(usersTable.role, "student")
      )
    )
    .limit(limit)
    .offset(offset);

  const filteredStudents = students.filter(s => s.role === "student");

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(usersTable)
    .where(eq(usersTable.role, "student"));

  const total = Number(totalResult[0]?.count ?? 0);

  const result = filteredStudents.map(s => ({
    id: s.id,
    firstName: s.firstName,
    lastName: s.lastName,
    email: s.email,
    phone: s.phone,
    status: s.status,
    paymentStatus: "pending",
    avatarUrl: s.avatarUrl,
    enrolledAt: s.createdAt?.toISOString(),
    createdAt: s.createdAt?.toISOString() ?? new Date().toISOString(),
  }));

  res.json({ students: result, total, page, limit });
});

router.get("/students/me/profile", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as any).userId as number;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  const regs = await db
    .select({
      id: registrationsTable.id,
      studentId: registrationsTable.studentId,
      courseId: registrationsTable.courseId,
      status: registrationsTable.status,
      paymentStatus: registrationsTable.paymentStatus,
      paymentReference: registrationsTable.paymentReference,
      amountPaid: registrationsTable.amountPaid,
      notes: registrationsTable.notes,
      registeredAt: registrationsTable.registeredAt,
      courseName: coursesTable.title,
    })
    .from(registrationsTable)
    .leftJoin(coursesTable, eq(registrationsTable.courseId, coursesTable.id))
    .where(eq(registrationsTable.studentId, userId));

  const registrations = regs.map(r => ({
    id: r.id,
    studentId: r.studentId,
    courseId: r.courseId,
    status: r.status,
    paymentStatus: r.paymentStatus,
    paymentReference: r.paymentReference,
    amountPaid: r.amountPaid,
    notes: r.notes,
    registeredAt: r.registeredAt?.toISOString() ?? new Date().toISOString(),
    courseName: r.courseName,
  }));

  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    status: user.status,
    paymentStatus: registrations.length > 0 ? registrations[0].paymentStatus : "pending",
    avatarUrl: user.avatarUrl,
    enrolledAt: user.createdAt?.toISOString(),
    createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
    bio: user.bio,
    registrations,
    progress: 0,
  });
});

router.get("/students/me/progress", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as any).userId as number;

  const regs = await db
    .select({
      courseId: registrationsTable.courseId,
      status: registrationsTable.status,
      courseName: coursesTable.title,
    })
    .from(registrationsTable)
    .leftJoin(coursesTable, eq(registrationsTable.courseId, coursesTable.id))
    .where(eq(registrationsTable.studentId, userId));

  const totalModules = 12;
  const completedModules = regs.filter(r => r.status === "completed").length * 2;

  res.json({
    studentId: userId,
    totalModules,
    completedModules: Math.min(completedModules, totalModules),
    progressPercent: totalModules > 0 ? Math.round((Math.min(completedModules, totalModules) / totalModules) * 100) : 0,
    currentCourse: regs.length > 0 ? regs[0].courseName : null,
    daysRemaining: 60,
    certificateEarned: false,
  });
});

router.get("/students/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid student ID" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
  if (!user || user.role !== "student") {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  const regs = await db
    .select({
      id: registrationsTable.id,
      studentId: registrationsTable.studentId,
      courseId: registrationsTable.courseId,
      status: registrationsTable.status,
      paymentStatus: registrationsTable.paymentStatus,
      paymentReference: registrationsTable.paymentReference,
      amountPaid: registrationsTable.amountPaid,
      notes: registrationsTable.notes,
      registeredAt: registrationsTable.registeredAt,
      courseName: coursesTable.title,
    })
    .from(registrationsTable)
    .leftJoin(coursesTable, eq(registrationsTable.courseId, coursesTable.id))
    .where(eq(registrationsTable.studentId, id));

  const registrations = regs.map(r => ({
    id: r.id,
    studentId: r.studentId,
    courseId: r.courseId,
    status: r.status,
    paymentStatus: r.paymentStatus,
    paymentReference: r.paymentReference,
    amountPaid: r.amountPaid,
    notes: r.notes,
    registeredAt: r.registeredAt?.toISOString() ?? new Date().toISOString(),
    courseName: r.courseName,
  }));

  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    status: user.status,
    paymentStatus: registrations.length > 0 ? registrations[0].paymentStatus : "pending",
    avatarUrl: user.avatarUrl,
    enrolledAt: user.createdAt?.toISOString(),
    createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
    bio: user.bio,
    registrations,
    progress: 0,
  });
});

router.patch("/students/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid student ID" });
    return;
  }

  const parsed = UpdateStudentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { firstName, lastName, phone, status, bio } = parsed.data;
  const updates: Record<string, unknown> = {};
  if (firstName != null) updates.firstName = firstName;
  if (lastName != null) updates.lastName = lastName;
  if (phone != null) updates.phone = phone;
  if (status != null) updates.status = status;
  if (bio != null) updates.bio = bio;

  if (Object.keys(updates).length === 0) {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    if (!user) { res.status(404).json({ error: "Student not found" }); return; }
    res.json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, status: user.status, paymentStatus: "pending", avatarUrl: user.avatarUrl, createdAt: user.createdAt?.toISOString() ?? new Date().toISOString() });
    return;
  }

  const [user] = await db.update(usersTable).set(updates as any).where(eq(usersTable.id, id)).returning();
  if (!user) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    status: user.status,
    paymentStatus: "pending",
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
  });
});

export default router;

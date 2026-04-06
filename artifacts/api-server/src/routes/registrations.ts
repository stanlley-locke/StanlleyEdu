import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, registrationsTable, usersTable, coursesTable } from "@workspace/db";
import { CreateRegistrationBody, UpdateRegistrationBody, ListRegistrationsQueryParams } from "@workspace/api-zod";
import { requireAuth, requireAdmin } from "../middlewares/auth";
import { createHash, randomBytes } from "crypto";

const router: IRouter = Router();

function hashPassword(password: string, salt: string): string {
  return createHash("sha256").update(password + salt).digest("hex");
}

router.get("/registrations", requireAdmin, async (req, res): Promise<void> => {
  const params = ListRegistrationsQueryParams.safeParse(req.query);
  const page = params.success && params.data.page ? Number(params.data.page) : 1;
  const limit = params.success && params.data.limit ? Number(params.data.limit) : 20;
  const offset = (page - 1) * limit;
  const status = params.success ? params.data.status : null;
  const courseId = params.success && params.data.courseId ? Number(params.data.courseId) : null;

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
      studentFirstName: usersTable.firstName,
      studentLastName: usersTable.lastName,
      studentEmail: usersTable.email,
      courseName: coursesTable.title,
    })
    .from(registrationsTable)
    .leftJoin(usersTable, eq(registrationsTable.studentId, usersTable.id))
    .leftJoin(coursesTable, eq(registrationsTable.courseId, coursesTable.id))
    .limit(limit)
    .offset(offset);

  let filtered = regs;
  if (status) filtered = filtered.filter(r => r.status === status);
  if (courseId) filtered = filtered.filter(r => r.courseId === courseId);

  const totalResult = await db.select({ count: sql<number>`count(*)` }).from(registrationsTable);
  const total = Number(totalResult[0]?.count ?? 0);

  const result = filtered.map(r => ({
    id: r.id,
    studentId: r.studentId,
    courseId: r.courseId,
    status: r.status,
    paymentStatus: r.paymentStatus,
    paymentReference: r.paymentReference,
    amountPaid: r.amountPaid,
    notes: r.notes,
    registeredAt: r.registeredAt?.toISOString() ?? new Date().toISOString(),
    studentName: r.studentFirstName && r.studentLastName ? `${r.studentFirstName} ${r.studentLastName}` : null,
    studentEmail: r.studentEmail,
    courseName: r.courseName,
  }));

  res.json({ registrations: result, total, page, limit });
});

router.post("/registrations", async (req, res): Promise<void> => {
  const parsed = CreateRegistrationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { firstName, lastName, email, phone, courseId, paymentReference, notes } = parsed.data;

  let userId: number;
  const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

  if (existingUser.length > 0) {
    userId = existingUser[0].id;
  } else {
    const salt = randomBytes(16).toString("hex");
    const tempPassword = randomBytes(8).toString("hex");
    const passwordHash = hashPassword(tempPassword, salt) + ":" + salt;

    const [newUser] = await db.insert(usersTable).values({
      firstName,
      lastName,
      email,
      phone,
      passwordHash,
      role: "student",
      status: "active",
    }).returning();
    userId = newUser.id;
  }

  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);
  if (!course) {
    res.status(400).json({ error: "Course not found" });
    return;
  }

  const [registration] = await db.insert(registrationsTable).values({
    studentId: userId,
    courseId,
    status: "pending",
    paymentStatus: paymentReference ? "pending" : "not_paid",
    paymentReference: paymentReference ?? null,
    notes: notes ?? null,
  }).returning();

  await db.update(coursesTable)
    .set({ enrolledCount: (course.enrolledCount ?? 0) + 1 })
    .where(eq(coursesTable.id, courseId));

  res.status(201).json({
    id: registration.id,
    studentId: registration.studentId,
    courseId: registration.courseId,
    status: registration.status,
    paymentStatus: registration.paymentStatus,
    paymentReference: registration.paymentReference,
    amountPaid: registration.amountPaid,
    notes: registration.notes,
    registeredAt: registration.registeredAt?.toISOString() ?? new Date().toISOString(),
    studentName: `${firstName} ${lastName}`,
    studentEmail: email,
    courseName: course.title,
  });
});

router.get("/registrations/:id", requireAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid registration ID" });
    return;
  }

  const [reg] = await db
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
      studentFirstName: usersTable.firstName,
      studentLastName: usersTable.lastName,
      studentEmail: usersTable.email,
      courseName: coursesTable.title,
    })
    .from(registrationsTable)
    .leftJoin(usersTable, eq(registrationsTable.studentId, usersTable.id))
    .leftJoin(coursesTable, eq(registrationsTable.courseId, coursesTable.id))
    .where(eq(registrationsTable.id, id))
    .limit(1);

  if (!reg) {
    res.status(404).json({ error: "Registration not found" });
    return;
  }

  res.json({
    id: reg.id,
    studentId: reg.studentId,
    courseId: reg.courseId,
    status: reg.status,
    paymentStatus: reg.paymentStatus,
    paymentReference: reg.paymentReference,
    amountPaid: reg.amountPaid,
    notes: reg.notes,
    registeredAt: reg.registeredAt?.toISOString() ?? new Date().toISOString(),
    studentName: reg.studentFirstName && reg.studentLastName ? `${reg.studentFirstName} ${reg.studentLastName}` : null,
    studentEmail: reg.studentEmail,
    courseName: reg.courseName,
  });
});

router.patch("/registrations/:id", requireAdmin, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid registration ID" });
    return;
  }

  const parsed = UpdateRegistrationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updates: Record<string, unknown> = {};
  const data = parsed.data;
  if (data.status != null) updates.status = data.status;
  if (data.paymentStatus != null) updates.paymentStatus = data.paymentStatus;
  if (data.paymentReference != null) updates.paymentReference = data.paymentReference;
  if (data.amountPaid != null) updates.amountPaid = data.amountPaid;
  if (data.notes != null) updates.notes = data.notes;

  const [reg] = await db.update(registrationsTable).set(updates as any).where(eq(registrationsTable.id, id)).returning();
  if (!reg) {
    res.status(404).json({ error: "Registration not found" });
    return;
  }

  res.json({
    id: reg.id,
    studentId: reg.studentId,
    courseId: reg.courseId,
    status: reg.status,
    paymentStatus: reg.paymentStatus,
    paymentReference: reg.paymentReference,
    amountPaid: reg.amountPaid,
    notes: reg.notes,
    registeredAt: reg.registeredAt?.toISOString() ?? new Date().toISOString(),
  });
});

export default router;

import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import { RegisterStudentBody, LoginUserBody } from "@workspace/api-zod";
import { createHash, randomBytes } from "crypto";

const router: IRouter = Router();

function hashPassword(password: string, salt: string): string {
  return createHash("sha256").update(password + salt).digest("hex");
}

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

const tokenStore = new Map<string, { userId: number; role: string; expiresAt: number }>();

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterStudentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { firstName, lastName, email, phone, password } = parsed.data;

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }

  const salt = randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt) + ":" + salt;

  const [user] = await db.insert(usersTable).values({
    firstName,
    lastName,
    email,
    phone,
    passwordHash,
    role: "student",
    status: "active",
  }).returning();

  const token = generateToken();
  tokenStore.set(token, { userId: user.id, role: user.role, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    token,
  });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const [hash, salt] = user.passwordHash.split(":");
  if (!salt || hashPassword(password, salt) !== hash) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = generateToken();
  tokenStore.set(token, { userId: user.id, role: user.role, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    token,
  });
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    tokenStore.delete(token);
  }
  res.json({ message: "Logged out successfully" });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const token = authHeader.slice(7);
  const session = tokenStore.get(token);
  if (!session || session.expiresAt < Date.now()) {
    tokenStore.delete(token);
    res.status(401).json({ error: "Session expired" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, session.userId)).limit(1);
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    token,
  });
});

export { tokenStore };
export default router;

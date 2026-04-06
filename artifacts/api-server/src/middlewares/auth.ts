import { type Request, type Response, type NextFunction } from "express";
import { tokenStore } from "../routes/auth";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
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

  (req as any).userId = session.userId;
  (req as any).userRole = session.role;
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if ((req as any).userRole !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }
    next();
  });
}

import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { asyncHandler } from "../middleware.js";

const router = Router();

// SNAPSHOT 01 — no auth. Anyone who knows the URL can read or write.
// This is the cliffhanger: the deliberate hole snapshot 02 closes.

const TodoCreateSchema = z.object({
  text: z.string().min(1).max(200),
  minutes: z.number().int().positive(),
});

const TodoPatchSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  done: z.boolean().optional(),
  minutes: z.number().int().positive().optional(),
});

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
    res.json(todos);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const result = TodoCreateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    // SNAPSHOT 01 — no auth, no real user id from a JWT. Hardcoded "anon"
    // makes the cliffhanger sharper: anyone can write under a fake identity.
    // Snapshot 02 replaces this with auth.userId from Clerk.
    const todo = await prisma.todo.create({
      data: { ...result.data, userId: "anon" },
    });
    res.status(201).json(todo);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const result = TodoPatchSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    const todo = await prisma.todo.update({ where: { id }, data: result.data });
    res.json(todo);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    await prisma.todo.delete({ where: { id } });
    res.status(204).end();
  })
);

export default router;

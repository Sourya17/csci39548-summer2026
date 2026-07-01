import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { z } from "zod";
import { prisma } from "../db.js";
import { asyncHandler } from "../middleware.js";

const router = Router();

// requireAuth() — block any request that doesn't carry a valid Clerk JWT.
// Applied to the whole todos router: every endpoint below it is protected.
router.use(requireAuth());

const TodoCreateSchema = z.object({
  text: z.string().min(1).max(200),
  minutes: z.number().int().positive(),
});

const TodoPatchSchema = z.object({
  text: z.string().min(1).max(200).optional(),
  done: z.boolean().optional(),
  minutes: z.number().int().positive().optional(),
});

// Tiny helper — pulls the Clerk userId off req. Throws if missing (but
// requireAuth above means we never reach this branch unauthenticated).
function userIdOrThrow(req: any): string {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("No userId after requireAuth — bug.");
  return userId;
}

// LIST — only the current user's todos. The scoping is the entire point.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = userIdOrThrow(req);
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { id: "asc" },
    });
    res.json(todos);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = userIdOrThrow(req);
    const id = Number(req.params.id);
    // Compound where: id AND userId. A request for someone else's todo
    // returns 404 — we don't leak existence to another user.
    const todo = await prisma.todo.findFirst({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const userId = userIdOrThrow(req);
    const result = TodoCreateSchema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    const todo = await prisma.todo.create({
      // Stamp the userId on creation. This is the row's owner forever.
      data: { ...result.data, userId },
    });
    res.status(201).json(todo);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = userIdOrThrow(req);
    const id = Number(req.params.id);
    const result = TodoPatchSchema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    // findFirst with userId so we can't PATCH another user's row.
    const existing = await prisma.todo.findFirst({ where: { id, userId } });
    if (!existing) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    const todo = await prisma.todo.update({
      where: { id },
      data: result.data,
    });
    res.json(todo);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const userId = userIdOrThrow(req);
    const id = Number(req.params.id);
    const existing = await prisma.todo.findFirst({ where: { id, userId } });
    if (!existing) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    await prisma.todo.delete({ where: { id } });
    res.status(204).end();
  })
);

export default router;

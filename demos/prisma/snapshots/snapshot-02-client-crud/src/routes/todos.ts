import { Router } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../middleware";
import { TodoCreateSchema, TodoPatchSchema } from "../schemas/todo";

const router = Router();

// READ — list. All routes are async because Prisma is async.
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
    res.json(todos);
  })
);

// READ — one
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  })
);

// CREATE
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const result = TodoCreateSchema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    const todo = await prisma.todo.create({ data: result.data });
    res.status(201).json(todo);
  })
);

// UPDATE — partial (PATCH)
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const result = TodoPatchSchema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    // Prisma throws P2025 if the record doesn't exist on update.
    // We pre-check to return a clean 404 instead of letting the error
    // bubble to the 500 handler.
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    const todo = await prisma.todo.update({ where: { id }, data: result.data });
    res.json(todo);
  })
);

// DELETE
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

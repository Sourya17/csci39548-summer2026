import { Router } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../middleware";
import { TodoCreateSchema, TodoPatchSchema } from "../schemas/todo";

const router = Router();

// LIST — accepts ?include=category to hydrate the relation.
// Without the flag we return only the todo fields (cheaper).
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const includeCategory = req.query.include === "category";
    const todos = await prisma.todo.findMany({
      orderBy: { id: "asc" },
      include: includeCategory ? { category: true } : undefined,
    });
    res.json(todos);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const todo = await prisma.todo.findUnique({
      where: { id },
      include: { category: true },
    });
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
    const result = TodoCreateSchema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    try {
      const todo = await prisma.todo.create({
        data: result.data,
        include: { category: true },
      });
      res.status(201).json(todo);
    } catch (err: any) {
      // P2003 = foreign key constraint failed (categoryId doesn't exist).
      if (err.code === "P2003") {
        res.status(400).json({ error: "categoryId does not exist" });
        return;
      }
      throw err;
    }
  })
);

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
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    try {
      const todo = await prisma.todo.update({
        where: { id },
        data: result.data,
        include: { category: true },
      });
      res.json(todo);
    } catch (err: any) {
      if (err.code === "P2003") {
        res.status(400).json({ error: "categoryId does not exist" });
        return;
      }
      throw err;
    }
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

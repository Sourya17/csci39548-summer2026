import { Router } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../middleware";
import { CategoryCreateSchema } from "../schemas/category";

const router = Router();

// LIST — accepts ?include=todos to hydrate the back-relation.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const includeTodos = req.query.include === "todos";
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
      include: includeTodos ? { todos: true } : undefined,
    });
    res.json(categories);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id },
      include: { todos: true },
    });
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.json(category);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const result = CategoryCreateSchema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ error: "Validation failed", issues: result.error.flatten() });
      return;
    }
    try {
      const category = await prisma.category.create({ data: result.data });
      res.status(201).json(category);
    } catch (err: any) {
      // P2002 = unique constraint failed (duplicate `name`).
      if (err.code === "P2002") {
        res.status(409).json({ error: "Category name already exists" });
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
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    // onDelete: SetNull on the FK means todos in this category survive,
    // their categoryId becomes null.
    await prisma.category.delete({ where: { id } });
    res.status(204).end();
  })
);

export default router;

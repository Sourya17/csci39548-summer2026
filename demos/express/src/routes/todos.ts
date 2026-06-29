import { Router } from "express";
import { todoStore } from "../store";
import { TodoCreateSchema, TodoPatchSchema } from "../schemas/todo";

const router = Router();

router.get("/", (_req, res) => {
  res.json(todoStore.list());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todoStore.get(id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(todo);
});

router.post("/", (req, res) => {
  // .safeParse returns { success, data | error } — no throw.
  // .parse throws ZodError on failure; we'd then catch in error handler.
  // safeParse is cleaner for inline 400 responses.
  const result = TodoCreateSchema.safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ error: "Validation failed", issues: result.error.flatten() });
    return;
  }
  const todo = todoStore.create(result.data.text, result.data.minutes);
  res.status(201).json(todo);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = TodoPatchSchema.safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ error: "Validation failed", issues: result.error.flatten() });
    return;
  }
  const updated = todoStore.update(id, result.data);
  if (!updated) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const removed = todoStore.remove(id);
  if (!removed) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.status(204).end();
});

router.get("/debug/boom", (_req, _res) => {
  throw new Error("Intentional crash for error-handler demo");
});

export default router;

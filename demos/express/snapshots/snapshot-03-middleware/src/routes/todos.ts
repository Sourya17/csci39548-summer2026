import { Router } from "express";
import { todoStore } from "../store";

// A Router is a mini Express app you can mount under a path prefix.
// All these handlers will be reachable at /api/todos/* once mounted.
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
  const { text, minutes } = req.body ?? {};
  if (typeof text !== "string" || typeof minutes !== "number") {
    res
      .status(400)
      .json({ error: "Body must be { text: string, minutes: number }" });
    return;
  }
  const todo = todoStore.create(text, minutes);
  res.status(201).json(todo);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { text, done, minutes } = req.body ?? {};
  const updated = todoStore.update(id, { text, done, minutes });
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

// Demo route for the global error handler — request /api/todos/boom to crash.
router.get("/debug/boom", (_req, _res) => {
  throw new Error("Intentional crash for error-handler demo");
});

export default router;

import express from "express";
import todoRouter from "./routes/todos";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware";

const app = express();
const PORT = 3000;

// Order matters. Express runs middleware top-to-bottom.
app.use(requestLogger);       // 1. log every request
app.use(express.json());      // 2. parse JSON bodies

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount the router. Every route inside todoRouter is prefixed by /api/todos.
app.use("/api/todos", todoRouter);

// 3. nothing matched — 404.
app.use(notFoundHandler);

// 4. anything threw — 500. MUST be last.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express demo listening on http://localhost:${PORT}`);
});

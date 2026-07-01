import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRouter from "./routes/todos.js";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware.js";

// SNAPSHOT 01 — no Clerk. No JWT verification. Open API.

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todoRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Snapshot 01 server (OPEN) on http://localhost:${PORT}`);
});

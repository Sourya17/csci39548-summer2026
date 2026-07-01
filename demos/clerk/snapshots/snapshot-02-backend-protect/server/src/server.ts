import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import todoRouter from "./routes/todos.js";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:5173";

// CORS: only our frontend. credentials:true lets cookies/Authorization headers through.
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());

// clerkMiddleware() reads the Authorization: Bearer <jwt> header (if present),
// verifies the JWT using CLERK_SECRET_KEY, and attaches `req.auth` with
// { userId, sessionId, ... }. It does NOT block unauthenticated requests —
// that's requireAuth()'s job, applied per-route.
app.use(clerkMiddleware());

// Logger AFTER clerkMiddleware so it can report the userId.
app.use(requestLogger);

// Open endpoint — no auth needed. Useful for uptime checks.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount the protected todos router. requireAuth() lives inside it.
app.use("/api/todos", todoRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Clerk demo server on http://localhost:${PORT}`);
  console.log(`Allowing CORS from ${FRONTEND_ORIGIN}`);
});

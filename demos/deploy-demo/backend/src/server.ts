import express from "express";
import cors from "cors";
import todoRouter from "./routes/todos";
import categoryRouter from "./routes/categories";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
  })
);
app.use(requestLogger);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todoRouter);
app.use("/api/categories", categoryRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Prisma demo listening on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import todoRouter from "./routes/todos";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(requestLogger);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todoRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Prisma demo listening on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import todoRouter from "./routes/todos";
import { requestLogger, notFoundHandler, errorHandler } from "./middleware";

const app = express();
const PORT = 3000;

// Resolve __dirname in ESM (Node doesn't give it for free).
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CORS — allow browsers on other origins to call this API.
// In production you'd restrict origins to your real frontend:
//   cors({ origin: "https://my-app.vercel.app" })
// Open CORS for class.
app.use(cors());

app.use(requestLogger);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todoRouter);

// Static frontend. Express serves the public/ folder as-is.
// Visiting http://localhost:3000/ returns public/index.html.
// Visiting /style.css returns public/style.css, and so on.
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express demo listening on http://localhost:${PORT}`);
});

import type { Request, Response, NextFunction } from "express";

// A logger middleware. Runs on every request.
// Pattern: do work, then call next() to hand control to the next handler.
export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const ts = new Date().toISOString();
  console.log(`${ts}  ${req.method}  ${req.url}`);
  next();
}

// 404 middleware. Mount AFTER all real routes.
// If nothing else handled the request, this catches it.
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `No route for ${req.method} ${req.url}` });
}

// Error-handling middleware has FOUR parameters. Express uses arity to
// distinguish it from regular middleware. Don't remove `_next` even if
// unused — drop it and Express stops calling this on errors.
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
}

import type { Request, Response, NextFunction, RequestHandler } from "express";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const ts = new Date().toISOString();
  console.log(`${ts}  ${req.method}  ${req.url}`);
  next();
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `No route for ${req.method} ${req.url}` });
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
}

// Express 4 doesn't catch errors thrown by async handlers — a rejected
// promise inside an async route handler just becomes an unhandled rejection.
// This tiny wrapper catches and forwards to next(), which the error handler
// above picks up.
// Express 5 (released Oct 2024) does this natively; we stay on 4 for parity
// with the Express demo, and teach the wrapper as a deliberate idiom.
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

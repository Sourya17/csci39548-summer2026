import type { Request, Response, NextFunction, RequestHandler } from "express";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const ts = new Date().toISOString();
  // Show whether Clerk parsed a user — helpful when debugging 401s.
  const who = (req as any).auth?.userId ?? "anon";
  console.log(`${ts}  ${req.method}  ${req.url}  [${who}]`);
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

export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

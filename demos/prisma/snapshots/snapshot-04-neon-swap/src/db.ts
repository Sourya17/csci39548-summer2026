import { PrismaClient } from "@prisma/client";

// One PrismaClient per process. Importing this module always returns
// the same instance — Node module caching does the work for us.
//
// In serverless (Vercel) you'd guard against hot-reload spawning
// many clients; that pattern is covered in the deploy demo.
export const prisma = new PrismaClient();

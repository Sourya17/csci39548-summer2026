// Snapshot 01 — no Express yet. Just prove the database round-trip works.
//
// Run with: npm run dev
// Watch tsx restart and re-query after every save.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
console.log("Todos in database:");
console.table(todos);

await prisma.$disconnect();

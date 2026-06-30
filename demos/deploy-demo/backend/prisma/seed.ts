import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Wipe + re-seed so seed is idempotent.
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { text: "Buy groceries", done: false, minutes: 30 },
      { text: "Walk the dog",  done: true,  minutes: 20 },
      { text: "Read 20 pages", done: false, minutes: 40 },
    ],
  });

  const count = await prisma.todo.count();
  console.log(`Seeded ${count} todos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

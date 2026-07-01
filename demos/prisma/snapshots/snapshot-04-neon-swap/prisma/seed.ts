import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear in FK-safe order: children before parents.
  await prisma.todo.deleteMany();
  await prisma.category.deleteMany();

  // Create categories first so we have IDs to link from todos.
  const errands = await prisma.category.create({ data: { name: "Errands" } });
  const reading = await prisma.category.create({ data: { name: "Reading" } });
  const pets = await prisma.category.create({ data: { name: "Pets" } });

  await prisma.todo.createMany({
    data: [
      { text: "Buy groceries", done: false, minutes: 30, categoryId: errands.id },
      { text: "Walk the dog",  done: true,  minutes: 20, categoryId: pets.id },
      { text: "Read 20 pages", done: false, minutes: 40, categoryId: reading.id },
      { text: "Mystery task",  done: false, minutes: 10 }, // no category
    ],
  });

  console.log(`Seeded ${await prisma.category.count()} categories and ${await prisma.todo.count()} todos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

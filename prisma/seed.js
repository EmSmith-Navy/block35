const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const employees = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Bob Johnson" },
    { name: "Alice Williams" },
    { name: "Charlie Brown" },
    { name: "Diana Prince" },
    { name: "Bruce Wayne" },
    { name: "Peter Parker" },
    { name: "Tony Stark" },
    { name: "Steve Rogers" },
  ];

  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

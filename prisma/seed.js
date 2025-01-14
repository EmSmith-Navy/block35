const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: "john@example.com", name: "John Doe" },
    { email: "jane@example.com", name: "Jane Smith" },
    { name: "Bob Johnson" },
    { name: "Alice Williams" },
    { name: "Charlie Brown" },
    { name: "Diana Prince" },
    { name: "Bruce Wayne" },
    { name: "Peter Parker" },
    { name: "Tony Stark" },
    { name: "Steve Rogers" },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
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


import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      username: "testuser",
      password: "test123",
    },
  });

  console.log("Test user created:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });

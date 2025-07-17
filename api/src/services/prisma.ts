import { PrismaClient } from "../generated/prisma";
import { demoUsers } from "../../seeds/users";
import { demoPosts } from "../../seeds/posts";
import { demoComments } from "../../seeds/comments";

const prisma = new PrismaClient();

async function clearData() {
  console.log('Clearing existing data...');
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Data cleared successfully!');
}

async function seedUsers() {
  console.log('Seeding users...');
  for (const user of demoUsers) {
    await prisma.user.create({
      data: user
    });
  }
  console.log('Users seeded successfully!');
}

async function seedPosts() {
  console.log('Seeding posts...');
  for (const post of demoPosts) {
    await prisma.post.create({
      data: post
    });
  }
  console.log('Posts seeded successfully!');
}

async function seedComments() {
  console.log('Seeding comments...');
  for (const comment of demoComments) {
    await prisma.comment.create({
      data: comment
    });
  }
  console.log('Comments seeded successfully!');
}

async function handleError(error: any) {
  console.error('Error seeding database:', error);
  await prisma.$disconnect();
  process.exit(1);
}

async function run() {
  try {
    console.log('Starting database seeding...');
    await clearData();
    await seedUsers();
    await seedPosts();
    await seedComments();
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    await handleError(error);
  } finally {
    await prisma.$disconnect();
  }
}

run();

export default prisma;
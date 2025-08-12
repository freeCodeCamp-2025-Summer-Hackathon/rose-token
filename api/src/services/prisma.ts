import { PrismaClient } from "../generated/prisma";
import { demoUsers } from "../../seeds/users";
import { demoPosts } from "../../seeds/posts";
import { demoComments } from "../../seeds/comments";

const prisma = new PrismaClient();


async function main(){
  console.log('Seeding users...');
  for (const user of demoUsers){
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    })
  }
  console.log('Users seeded successfully!');


  for (const post of demoPosts){
    await prisma.post.upsert({
      where: { id: post.id },
      update: {},
      create: post,
    })
  }
  console.log('Posts seeded successfully!');
  for (const comment of demoComments){
    await prisma.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: comment,
    })
  }
  console.log('Comments seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export default prisma;
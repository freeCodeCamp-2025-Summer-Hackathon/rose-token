import prisma from "./prisma";

export const incrementProgress = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { progress: { increment: 1 } },
  });
}

export const getUserProgress = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { progress: true }, 
  });
}
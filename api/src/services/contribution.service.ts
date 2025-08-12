// src/services/contribution.service.ts
import prisma from "./prisma";
import { Level, Language, Category, ContributionType } from "../generated/prisma";


interface CreateContributionDTO {
  type: ContributionType;
  content: string;
  category: Category;
  difficulty: Level;
  language: Language;
  userId: string;
  frontText: string;
  backText: string;
  noteText: string
}

export const createContribution = async (data: CreateContributionDTO) => {
  const { type, content, category, difficulty, language, userId, frontText, backText, noteText } = data;

  await prisma.course.create({
    data: {
      title: language,
      language: language.toUpperCase() as Language,
    }
  });

  const contribution = await prisma.contribution.create({
    data: {
      title: `${frontText} ${type.toLowerCase()}`,
      type: type.toUpperCase() as ContributionType,
      category: category.toUpperCase() as Category,
      level: difficulty.toUpperCase() as Level,
      contributor: {
        connect: { id: userId },
      },
      language: language.toUpperCase() as Language,
      front: type.toUpperCase() === "FLASHCARD" ? frontText : undefined,
      back: type.toUpperCase() === "FLASHCARD" ? backText : undefined,
      body: type.toUpperCase() === "NOTE" ? noteText : undefined,
      tags: [], 
    },
  });

  console.log("success");

  return contribution;
};

export const getAllContributions = async () => {
  return await prisma.contribution.findMany({
  select: {
    id: true,
    title: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
});
};

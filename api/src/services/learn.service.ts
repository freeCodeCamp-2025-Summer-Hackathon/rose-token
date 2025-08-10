import prisma  from "./prisma";
import { Language, Level } from "../generated/prisma";

//fetch for a specific language
export const getLearningContentByLanguage = async (language: string) => {
  return await prisma.contribution.findMany({
    where: { 
      language: language.toUpperCase() as Language 
    },
  });
};

//fetch lessons by their difficulty i.e. easy, medium, hard
export const getLearningContentByDifficulty = async (level: string) => {
  return await prisma.contribution.findMany({
    where: { 
      level: level.toUpperCase() as Level 
    },
  });
};
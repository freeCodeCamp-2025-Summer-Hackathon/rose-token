import  prisma  from "./prisma";

export const getAllCourses = async () => {
  return await prisma.course.findMany({
  distinct: ['title'], 
});
};

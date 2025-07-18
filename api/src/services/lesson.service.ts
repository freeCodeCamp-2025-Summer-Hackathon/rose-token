import prisma from "./prisma";

enum Level {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

enum Category {
  GRAMMAR = "GRAMMAR",
  VOCABULARY = "VOCABULARY",
  SPEAKING = "SPEAKING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
}

export const lessonService = {
  async createLesson(data: {
    title: string;
    courseId: number;
    level: Level;
    duration: number;
    category: Category;
  }) {
    const contributions = await prisma.contribution.findMany({
      where: { category: data.category },
      orderBy: { createdAt: "asc" },
      select: { id: true }
    });

    return prisma.$transaction(async (tx: any) => {
      const lesson = await tx.lesson.create({
        data: {
          title: data.title,
          courseId: data.courseId,
          level: data.level,
          duration: data.duration,
          category: data.category,
        },
      });

      const contentCreates = contributions.map((c: { id: number }, idx: number) => ({
        lessonId: lesson.id,
        contributionId: c.id,
        order: idx + 1,
      }));
      await tx.lessonContent.createMany({ data: contentCreates });

      return lesson;
    });
  },

  async getLesson(id: number) {
    return prisma.lesson.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { order: "asc" },
          include: { contribution: true },
        },
      },
    });
  },

  async getLessonsByCategory(categoryName: string) {
  const cat = categoryName.toUpperCase() as Category;
  if (!Object.values(Category).includes(cat)) {
    throw new Error(`Invalid category: ${categoryName}`);
  }

  return prisma.lesson.findMany({
    where: { category: cat },
    include: {
      items: {
        orderBy: { order: "asc" },
        include: { contribution: true },
      },
    },
  });
},
  async updateLesson(
    id: number,
    data: {
      title?: string;
      courseId?: number;
      level?: Level;
      duration?: number;
      category?: Category;
    }
  ) {
    const existing = await prisma.lesson.findUnique({
      where: { id },
      select: { category: true },
    });
    if (!existing) throw new Error("Lesson not found");

    return prisma.$transaction(async (tx: any) => {
      const lesson = await tx.lesson.update({
        where: { id },
        data: {
          title: data.title,
          courseId: data.courseId,
          level: data.level,
          duration: data.duration,
          ...(data.category !== undefined
            ? { category: data.category }
            : {}),
        },
      });

      if (data.category && data.category !== existing.category) {
        await tx.lessonContent.deleteMany({ where: { lessonId: id } });

        const contributions = await tx.contribution.findMany({
          where: { category: data.category },
          orderBy: { createdAt: "asc" },
          select: { id: true },
        });

        const contentCreates = contributions.map((c: { id: number }, idx: number) => ({
          lessonId: id,
          contributionId: c.id,
          order: idx + 1,
        }));
        await tx.lessonContent.createMany({ data: contentCreates });
      }

      return lesson;
    });
  },

  async deleteLesson(id: number) {
    return prisma.lesson.delete({ where: { id } });
  },
};
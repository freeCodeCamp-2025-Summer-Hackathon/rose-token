import prisma from "./prisma";

enum Category {
  GRAMMAR = "GRAMMAR",
  VOCABULARY = "VOCABULARY",
  SPEAKING = "SPEAKING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
}

export const contributionService = {
  //Contribution
  async createContribution(data: {
    title: string;
    content: string;
    category: Category;
    tags?: string[];
    lessonId: number;
  }) {
    return prisma.contribution.create({ data });
  },

  async getContribution(id: number) {
    return prisma.contribution.findUnique({
      where: { id },
    });
  },

  async updateContribution(id: number, data: {
    title?: string;
    content?: string;
    category?: Category;
    tags?: string[];
  }) {
    return prisma.contribution.update({
      where: { id },
      data,
    });
  },

  async deleteContribution(id: number) {
    return prisma.contribution.delete({
      where: { id },
    });
  },

  //Tags
  async addTag(id: string, tag: string) {
    return prisma.contribution.update({
      where: { id },
      data: { tags: { push: tag } },
    });
  },

  async removeTag(id: string, tag: string) {
    const contribution = await prisma.contribution.findUnique({
      where: { id },
    });
    if (!contribution) return null;
    const updatedTags = contribution.tags.filter((t: string) => t !== tag);
    return prisma.contribution.update({
      where: { id },
      data: { tags: updatedTags },
    });
  },

  async updateTag(id: string, oldTag: string, newTag: string) {
    const contribution = await prisma.contribution.findUnique({
      where: { id },
    });
    if (!contribution) return null;
    const updatedTags = contribution.tags.map((t: string) =>
      t === oldTag ? newTag : t
    );
    return prisma.contribution.update({
      where: { id },
      data: { tags: updatedTags },
    });
  },

  async getTags(id: string) {
    const contribution = await prisma.contribution.findUnique({
      where: { id },
    });
    return contribution?.tags || [];
  },

  async filterByTag(tag: string) {
    return prisma.contribution.findMany({
      where: {
        tags: {
          has: tag,
        },
      },
    });
  },

  //Category
  async filterByCategory(category: Category) {
    return prisma.contribution.findMany({
      where: { category },
    });
  },
};


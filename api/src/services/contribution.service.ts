import prisma from "./prisma";

enum Category {
  GRAMMAR = "GRAMMAR",
  VOCABULARY = "VOCABULARY",
  SPEAKING = "SPEAKING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
}

type ContributionType = "flashcard" | "note";

export const contributionService = {
  //Contribution
  async createContribution(data: {
    title: string;
    category: Category;
    tags?: string[];
    type: ContributionType;
    flashcardData?: { front: string; back: string; contributorId: string };
    noteData?: { title: string; body: string; contributorId: string };
  }) {
    const { type, flashcardData, noteData, ...contrib } = data;

    if (type === "flashcard") {
      if (!flashcardData) throw new Error("flashcardData is required");
      const fc = await prisma.flashcard.create({ data: flashcardData });
      return prisma.contribution.create({
        data: {
          ...contrib,
          flashcardId: fc.id,
          noteId: null,
        },
      });
    } else {
      if (!noteData) throw new Error("noteData is required");
      const nt = await prisma.note.create({ data: noteData });
      return prisma.contribution.create({
        data: {
          ...contrib,
          noteId: nt.id,
          flashcardId: null,
        },
      });
    }
  },

  async getContribution(id: number) {
    return prisma.contribution.findUnique({
      where: { id },
      include: { flashcard: true, note: true },
    });
  },

  async updateContribution(
    id: number,
    data: {
      title?: string;
      category?: Category;
      tags?: string[];
      type?: ContributionType;
      flashcardData?: { front: string; back: string; contributorId: string };
      noteData?: { title: string; body: string; contributorId: string };
    }
  ) {
    const existing = await prisma.contribution.findUnique({
      where: { id },
      select: { flashcardId: true, noteId: true },
    });
    if (!existing) throw new Error("Not found");

    let flashcardId: string | null = existing.flashcardId;
    let noteId: string | null = existing.noteId;

    if (data.type === "flashcard") {
      if (noteId) await prisma.note.delete({ where: { id: noteId } });
      noteId = null;
      if (!data.flashcardData) throw new Error("flashcardData is required");
      const fc = await prisma.flashcard.create({ data: data.flashcardData });
      flashcardId = fc.id;
    } else if (data.type === "note") {
      if (flashcardId)
        await prisma.flashcard.delete({ where: { id: flashcardId } });
      flashcardId = null;
      if (!data.noteData) throw new Error("noteData is required");
      const nt = await prisma.note.create({ data: data.noteData });
      noteId = nt.id;
    }

    return prisma.contribution.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        tags: data.tags,
        flashcardId,
        noteId,
      },
      include: { flashcard: true, note: true },
    });
  },

  async listContributionsByCategory(category: Category) {
  return prisma.contribution.findMany({ where: { category } });
},


  async deleteContribution(id: number) {
    return prisma.contribution.delete({
      where: { id },
      include: { flashcard: true, note: true },
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

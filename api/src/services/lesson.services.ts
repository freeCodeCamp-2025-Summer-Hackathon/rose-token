import prisma from "./prisma";

interface CreateLessonData {
  categoryId: string;
  title: string;
  content: string;
  order?: number;
  duration?: number;
  level?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
}

interface UpdateLessonData {
  title?: string;
  content?: string;
  order?: number;
  duration?: number;
  level?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  isPublished?: boolean;
}

// Validation helper for lesson level
export const validateLevel = (level: string): boolean => {
  return ["beginner", "intermediate", "advanced"].includes(level);
};

// Validation helper for tags (max 3 per lesson)
export const validateTags = (tags: string[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (tags.length > 3) {
    errors.push("Maximum 3 tags allowed per lesson");
  }
  
  tags.forEach((tag, index) => {
    if (!tag || tag.trim() === "") {
      errors.push(`Tag at position ${index + 1} cannot be empty`);
    } else if (tag.length > 50) {
      errors.push(`Tag "${tag}" is too long (max 50 characters)`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// GET /categories/:categoryId/lessons - Get all lessons in a category
export const getLessonsByCategory = async (categoryId: string) => {
  try {
    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return await prisma.lesson.findMany({
      where: { categoryId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  } catch (error) {
    console.error("Error fetching lessons by category:", error);
    throw error;
  }
};

// POST /categories/:categoryId/lessons - Create new lesson in category (admin only)
export const createLesson = async (data: CreateLessonData) => {
  try {
    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId }
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // Validate level if provided
    if (data.level && !validateLevel(data.level)) {
      throw new Error("Invalid level. Must be 'beginner', 'intermediate', or 'advanced'");
    }

    // Validate tags if provided
    if (data.tags && data.tags.length > 0) {
      const tagValidation = validateTags(data.tags);
      if (!tagValidation.isValid) {
        throw new Error(`Tag validation failed: ${tagValidation.errors.join(", ")}`);
      }
    }

    // If no order specified, set it to the next available order in the category
    let order = data.order;
    if (order === undefined) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { categoryId: data.categoryId },
        orderBy: { order: 'desc' }
      });
      order = lastLesson ? lastLesson.order + 1 : 1;
    }

    const lesson = await prisma.lesson.create({
      data: {
        categoryId: data.categoryId,
        title: data.title,
        content: data.content,
        order,
        duration: data.duration,
        level: data.level || "beginner",
        tags: data.tags || []
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    });

    return lesson;
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

// GET /lessons/:lessonId - Get specific lesson by ID
export const getLessonById = async (lessonId: string) => {
  try {
    return await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw new Error("Failed to fetch lesson");
  }
};

// PUT /lessons/:lessonId - Update lesson (admin only)
export const updateLesson = async (lessonId: string, data: UpdateLessonData) => {
  try {
    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!existingLesson) {
      return null;
    }

    // Validate level if provided
    if (data.level && !validateLevel(data.level)) {
      throw new Error("Invalid level. Must be 'beginner', 'intermediate', or 'advanced'");
    }

    // Validate tags if provided
    if (data.tags && data.tags.length > 0) {
      const tagValidation = validateTags(data.tags);
      if (!tagValidation.isValid) {
        throw new Error(`Tag validation failed: ${tagValidation.errors.join(", ")}`);
      }
    }

    return await prisma.lesson.update({
      where: { id: lessonId },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

// DELETE /lessons/:lessonId - Delete lesson (admin only)
export const deleteLesson = async (lessonId: string) => {
  try {
    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!existingLesson) {
      return null;
    }

    await prisma.lesson.delete({
      where: { id: lessonId }
    });

    return true;
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};

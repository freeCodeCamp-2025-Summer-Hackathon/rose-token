import prisma from "./prisma";

interface CreateCategoryInput {
  name: string;
  description?: string;
  color?: string;
}

interface UpdateCategoryInput {
  name?: string;
  description?: string;
  color?: string;
}

// CREATE - Admin only
export const createCategory = async (data: CreateCategoryInput) => {
  const { name, description, color } = data;
  
  // Check if category with same name exists
  const existingCategory = await prisma.category.findUnique({
    where: { name }
  });
  
  if (existingCategory) {
    throw new Error("Category with this name already exists");
  }
  
  const category = await prisma.category.create({
    data: {
      name,
      description,
      color
    }
  });
  
  return category;
};

// READ - Get all categories
export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          lessons: true,
          posts: true
        }
      }
    }
  });
  
  return categories;
};

// READ - Get single category by ID
export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      lessons: {
        select: { id: true, title: true, tags: true }
      },
      posts: {
        select: { id: true, title: true, tags: true }
      }
    }
  });
  
  if (!category) {
    throw new Error("Category not found");
  }
  
  return category;
};

// UPDATE - Admin only
export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id }
  });
  
  if (!existingCategory) {
    throw new Error("Category not found");
  }
  
  // Check name uniqueness if name is being updated
  if (data.name && data.name !== existingCategory.name) {
    const nameExists = await prisma.category.findUnique({
      where: { name: data.name }
    });
    
    if (nameExists) {
      throw new Error("Category with this name already exists");
    }
  }
  
  const updatedCategory = await prisma.category.update({
    where: { id },
    data
  });
  
  return updatedCategory;
};

// DELETE - Admin only
export const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: { lessons: true, posts: true }
      }
    }
  });
  
  if (!category) {
    throw new Error("Category not found");
  }
  
  // Prevent deletion if category has lessons or posts
  if (category._count.lessons > 0 || category._count.posts > 0) {
    throw new Error("Cannot delete category that has lessons or posts. Please reassign content first.");
  }
  
  await prisma.category.delete({
    where: { id }
  });
  
  return { message: "Category deleted successfully" };
};

// UTILITY - Get categories with filtering
export const getFilteredCategories = async (searchTerm?: string) => {
  const categories = await prisma.category.findMany({
    where: searchTerm ? {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } }
      ]
    } : {},
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { lessons: true, posts: true }
      }
    }
  });
  
  return categories;
};

// FILTERING - Get lessons filtered by category and/or tags
export const getFilteredLessons = async (filters: {
  categoryId?: string;
  tags?: string[];
  searchTerm?: string;
}) => {
  const { categoryId, tags, searchTerm } = filters;
  
  const lessons = await prisma.lesson.findMany({
    where: {
      AND: [
        // Filter by category if provided
        categoryId ? { categoryId } : {},
        
        // Filter by tags if provided (lessons that have ANY of the specified tags)
        tags && tags.length > 0 ? {
          tags: {
            hasSome: tags
          }
        } : {},
        
        // Search in title/content if searchTerm provided
        searchTerm ? {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { content: { contains: searchTerm, mode: 'insensitive' } }
          ]
        } : {},
        
        // Only published lessons
        { isPublished: true }
      ]
    },
    include: {
      category: {
        select: { id: true, name: true, color: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return lessons;
};

// FILTERING - Get posts filtered by category and/or tags
export const getFilteredPosts = async (filters: {
  categoryId?: string;
  tags?: string[];
  searchTerm?: string;
  authorId?: string;
}) => {
  const { categoryId, tags, searchTerm, authorId } = filters;
  
  const posts = await prisma.post.findMany({
    where: {
      AND: [
        // Filter by category if provided
        categoryId ? { categoryId } : {},
        
        // Filter by tags if provided (posts that have ANY of the specified tags)
        tags && tags.length > 0 ? {
          tags: {
            hasSome: tags
          }
        } : {},
        
        // Filter by author if provided
        authorId ? { authorId } : {},
        
        // Search in title/content if searchTerm provided
        searchTerm ? {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { content: { contains: searchTerm, mode: 'insensitive' } }
          ]
        } : {},
        
        // Only published posts
        { isPublished: true }
      ]
    },
    include: {
      category: {
        select: { id: true, name: true, color: true }
      },
      author: {
        select: { id: true, name: true, username: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return posts;
};

// UTILITY - Get all unique tags from lessons and posts (for tag suggestions)
export const getAllTags = async () => {
  const [lessons, posts] = await Promise.all([
    prisma.lesson.findMany({
      where: { isPublished: true },
      select: { tags: true }
    }),
    prisma.post.findMany({
      where: { isPublished: true },
      select: { tags: true }
    })
  ]);
  
  // Combine all tags and get unique values
  const allTags = new Set<string>();
  
  lessons.forEach(lesson => {
    lesson.tags.forEach(tag => allTags.add(tag));
  });
  
  posts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });
  
  return Array.from(allTags).sort();
};

// VALIDATION - Validate tag array (max 3 tags)
export const validateTags = (tags: string[]): boolean => {
  if (!Array.isArray(tags)) return false;
  if (tags.length > 3) return false;
  
  // Check each tag is non-empty string and reasonable length
  return tags.every(tag => 
    typeof tag === 'string' && 
    tag.trim().length > 0 && 
    tag.trim().length <= 50
  );
};

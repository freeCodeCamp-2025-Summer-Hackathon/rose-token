import { Request, Response } from "express";
import * as categoryService from "../services/category.services";

// Helper function to check if user is admin
const isAdmin = (req: Request): boolean => {
  // TODO: Implement proper admin check from JWT token
  // For now, we'll assume admin check is done in middleware
  return true; // Placeholder
};

// CREATE Category (Admin only)
export const createCategory = async (req: Request, res: Response) => {
  try {
    if (!isAdmin(req)) {
      res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
      return;
    }

    const { name, description, color } = req.body;

    if (!name || name.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Category name is required"
      });
      return;
    }

    const category = await categoryService.createCategory({
      name: name.trim(),
      description: description?.trim(),
      color
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });

  } catch (error) {
    console.error("Create Category Error:", error);
    
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating category"
      });
    }
  }
};

// GET All Categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    let categories;
    if (search && typeof search === 'string') {
      categories = await categoryService.getFilteredCategories(search);
    } else {
      categories = await categoryService.getAllCategories();
    }

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
      count: categories.length
    });

  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching categories"
    });
  }
};

// GET Single Category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    const category = await categoryService.getCategoryById(id);

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category
    });

  } catch (error) {
    console.error("Get Category Error:", error);
    
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching category"
    });
  }
};

// UPDATE Category (Admin only)
export const updateCategory = async (req: Request, res: Response) => {
  try {
    if (!isAdmin(req)) {
      res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
      return;
    }

    const { id } = req.params;
    const { name, description, color } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    // Create update object with only provided fields
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description?.trim();
    if (color !== undefined) updateData.color = color;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one field is required for update"
      });
      return;
    }

    const category = await categoryService.updateCategory(id, updateData);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });

  } catch (error) {
    console.error("Update Category Error:", error);
    
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong while updating category"
      });
    }
  }
};

// DELETE Category (Admin only)
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    if (!isAdmin(req)) {
      res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
      return;
    }

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    const result = await categoryService.deleteCategory(id);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error("Delete Category Error:", error);
    
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong while deleting category"
      });
    }
  }
};

// GET /api/categories/lessons/filter - Filter lessons by category and tags
export const getFilteredLessonsController = async (req: Request, res: Response) => {
  try {
    const { categoryId, tags, searchTerm } = req.query;
    
    const filters = {
      categoryId: categoryId as string,
      tags: tags ? (tags as string).split(',').map(tag => tag.trim()) : undefined,
      searchTerm: searchTerm as string
    };
    
    const lessons = await categoryService.getFilteredLessons(filters);
    
    res.status(200).json({
      success: true,
      data: lessons,
      message: "Lessons filtered successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error filtering lessons"
    });
  }
};

// GET /api/categories/posts/filter - Filter posts by category and tags
export const getFilteredPostsController = async (req: Request, res: Response) => {
  try {
    const { categoryId, tags, searchTerm, authorId } = req.query;
    
    const filters = {
      categoryId: categoryId as string,
      tags: tags ? (tags as string).split(',').map(tag => tag.trim()) : undefined,
      searchTerm: searchTerm as string,
      authorId: authorId as string
    };
    
    const posts = await categoryService.getFilteredPosts(filters);
    
    res.status(200).json({
      success: true,
      data: posts,
      message: "Posts filtered successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error filtering posts"
    });
  }
};

// GET /api/categories/tags - Get all unique tags
export const getAllTagsController = async (req: Request, res: Response) => {
  try {
    const tags = await categoryService.getAllTags();
    
    res.status(200).json({
      success: true,
      data: tags,
      message: "Tags retrieved successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving tags"
    });
  }
};

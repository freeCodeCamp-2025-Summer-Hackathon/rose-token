import { Request, Response } from "express";
import * as categoryService from "../services/category.services";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// CREATE Category (Admin only)
export const createCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
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

// GET All Categories (Public)
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
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
      message: "Something went wrong while retrieving categories"
    });
  }
};

// GET Category by ID (Public)
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
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

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category
    });
  } catch (error) {
    console.error("Get Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving category"
    });
  }
};

// UPDATE Category (Admin only)
export const updateCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, color } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    if (!name || name.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Category name is required"
      });
      return;
    }

    const category = await categoryService.updateCategory(id, {
      name: name.trim(),
      description: description?.trim(),
      color
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found"
      });
      return;
    }

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
export const deleteCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    const deleted = await categoryService.deleteCategory(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Category not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting category"
    });
  }
};

// GET Filtered Lessons (Public)
export const getFilteredLessonsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, tags, searchTerm } = req.query;

    const lessons = await categoryService.getFilteredLessons({
      categoryId: categoryId as string,
      tags: tags ? (Array.isArray(tags) ? tags as string[] : [tags as string]) : undefined,
      searchTerm: searchTerm as string
    });

    res.status(200).json({
      success: true,
      message: "Lessons retrieved successfully",
      data: lessons,
      count: lessons.length
    });
  } catch (error) {
    console.error("Get Filtered Lessons Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving lessons"
    });
  }
};

// GET Filtered Posts (Public)
export const getFilteredPostsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, tags, searchTerm, authorId } = req.query;

    const posts = await categoryService.getFilteredPosts({
      categoryId: categoryId as string,
      tags: tags ? (Array.isArray(tags) ? tags as string[] : [tags as string]) : undefined,
      searchTerm: searchTerm as string,
      authorId: authorId as string
    });

    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
      count: posts.length
    });
  } catch (error) {
    console.error("Get Filtered Posts Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving posts"
    });
  }
};

// GET All Tags (Public)
export const getAllTagsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await categoryService.getAllTags();

    res.status(200).json({
      success: true,
      message: "Tags retrieved successfully",
      data: tags,
      count: tags.length
    });
  } catch (error) {
    console.error("Get Tags Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving tags"
    });
  }
};

import { Request, Response } from "express";
import * as lessonService from "../services/lesson.services";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// works

// GET /categories/:categoryId/lessons - Get all lessons in a category (Public)
export const getLessonsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    const lessons = await lessonService.getLessonsByCategory(categoryId);

    res.status(200).json({
      success: true,
      message: "Lessons retrieved successfully",
      data: lessons,
      count: lessons.length
    });
  } catch (error) {
    console.error("Get Lessons by Category Error:", error);
    
    if (error instanceof Error && error.message === "Category not found") {
      res.status(404).json({
        success: false,
        message: "Category not found"
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving lessons"
    });
  }
};

// POST /categories/:categoryId/lessons - Create new lesson (Admin only)
export const createLesson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { title, content, order, duration, level, tags } = req.body;

    if (!categoryId) {
      res.status(400).json({
        success: false,
        message: "Category ID is required"
      });
      return;
    }

    if (!title || title.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Lesson title is required"
      });
      return;
    }

    if (!content || content.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Lesson content is required"
      });
      return;
    }

    const lesson = await lessonService.createLesson({
      categoryId,
      title: title.trim(),
      content: content.trim(),
      order,
      duration,
      level,
      tags
    });

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      data: lesson
    });
  } catch (error) {
    console.error("Create Lesson Error:", error);
    
    if (error instanceof Error) {
      if (error.message === "Category not found") {
        res.status(404).json({
          success: false,
          message: "Category not found"
        });
        return;
      }
      
      if (error.message.includes("validation failed") || error.message.includes("Invalid level")) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating lesson"
    });
  }
};

// GET /lessons/:lessonId - Get specific lesson (Public)
export const getLessonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;

    if (!lessonId) {
      res.status(400).json({
        success: false,
        message: "Lesson ID is required"
      });
      return;
    }

    const lesson = await lessonService.getLessonById(lessonId);

    if (!lesson) {
      res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lesson retrieved successfully",
      data: lesson
    });
  } catch (error) {
    console.error("Get Lesson Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving lesson"
    });
  }
};

// PUT /lessons/:lessonId - Update lesson (Admin only)
export const updateLesson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const { title, content, order, duration, level, tags, isPublished } = req.body;

    if (!lessonId) {
      res.status(400).json({
        success: false,
        message: "Lesson ID is required"
      });
      return;
    }

    const lesson = await lessonService.updateLesson(lessonId, {
      title: title?.trim(),
      content: content?.trim(),
      order,
      duration,
      level,
      tags,
      isPublished
    });

    if (!lesson) {
      res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: lesson
    });
  } catch (error) {
    console.error("Update Lesson Error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("validation failed") || error.message.includes("Invalid level")) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating lesson"
    });
  }
};

// DELETE /lessons/:lessonId - Delete lesson (Admin only)
export const deleteLesson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;

    if (!lessonId) {
      res.status(400).json({
        success: false,
        message: "Lesson ID is required"
      });
      return;
    }

    const deleted = await lessonService.deleteLesson(lessonId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully"
    });
  } catch (error) {
    console.error("Delete Lesson Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting lesson"
    });
  }
};

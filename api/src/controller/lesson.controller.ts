import { Request, Response, NextFunction } from "express";
import { lessonService } from "../services/lesson.service";
import { ApiResponse } from "../utils/ApiResponse";
import { RequestHandler } from "express";
import { asyncHandler } from '../utils/asyncHandler'

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

// 1) GET /categories/:categoryId/lessons
export const listLessonsByCategory = asyncHandler(
  async (req, res, next) => {
    const catParam = req.params.categoryId.toUpperCase() as Category;
    if (!Object.values(Category).includes(catParam)) {
      return new ApiResponse(400, null, "Invalid category").send(res);
    }
    const lessons = await lessonService.getLessonsByCategory(catParam);
    return new ApiResponse(200, lessons, "Lessons fetched successfully").send(res);
  }
);

// 2) POST /categories/:categoryId/lessons
export const createLessonInCategory = asyncHandler(
  async (req, res, next) => {
    const catParam = req.params.categoryId.toUpperCase() as Category;
    if (!Object.values(Category).includes(catParam)) {
      return new ApiResponse(400, null, "Invalid category").send(res);
    }

    const { title, courseId, level, duration } = req.body;
    if (!title || !courseId || !level || !duration) {
      return new ApiResponse(400, null, "Missing required fields").send(res);
    }
    if (!Object.values(Level).includes(level)) {
      return new ApiResponse(400, null, "Invalid level").send(res);
    }

    const lesson = await lessonService.createLesson({
      title,
      courseId,
      level,
      duration,
      category: catParam,
    });
    return new ApiResponse(201, lesson, "Lesson created successfully").send(res);
  }
);

// 3) GET /lessons/:lessonId
export const getLessonById = asyncHandler(
  async (req, res, next) => {
    const lessonId = Number(req.params.lessonId);
    if (Number.isNaN(lessonId)) {
      return new ApiResponse(400, null, "Invalid lessonId").send(res);
    }
    const lesson = await lessonService.getLesson(lessonId);
    if (!lesson) {
      return new ApiResponse(404, null, "Lesson not found").send(res);
    }
    return new ApiResponse(200, lesson, "Lesson retrieved successfully").send(res);
  }
);

// 4) PUT /lessons/:lessonId
export const updateLessonById = asyncHandler(
  async (req, res, next) => {
    const lessonId = Number(req.params.lessonId);
    if (Number.isNaN(lessonId)) {
      return new ApiResponse(400, null, "Invalid lessonId").send(res);
    }

    const { title, courseId, level, duration, category } = req.body;
    const updateData: {
      title?: string;
      courseId?: number;
      level?: Level;
      duration?: number;
      category?: Category;
    } = {};

    if (title) updateData.title = title;
    if (courseId) updateData.courseId = courseId;
    if (duration) updateData.duration = duration;
    if (level) {
      if (!Object.values(Level).includes(level)) {
        return new ApiResponse(400, null, "Invalid level").send(res);
      }
      updateData.level = level;
    }
    if (category) {
      const cat = category.toUpperCase() as Category;
      if (!Object.values(Category).includes(cat)) {
        return new ApiResponse(400, null, "Invalid category").send(res);
      }
      updateData.category = cat;
    }

    const lesson = await lessonService.updateLesson(lessonId, updateData);
    return new ApiResponse(200, lesson, "Lesson updated successfully").send(res);
  }
);

// 5) DELETE /lessons/:lessonId
export const deleteLessonById = asyncHandler(
  async (req, res, next) => {
    const lessonId = Number(req.params.lessonId);
    if (Number.isNaN(lessonId)) {
      return new ApiResponse(400, null, "Invalid lessonId").send(res);
    }
    await lessonService.deleteLesson(lessonId);
    return new ApiResponse(200, null, "Lesson deleted successfully").send(res);
  }
);
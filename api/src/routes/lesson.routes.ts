import { Router } from "express";
import {
  getLessonsByCategory,
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson
} from "../controller/lesson.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

// Lesson routes matching the API specification

// GET /categories/:categoryId/lessons - Get lessons by category (Public)
router.get("/categories/:categoryId/lessons", getLessonsByCategory);

// POST /categories/:categoryId/lessons - Create lesson in category (Admin only)
router.post("/categories/:categoryId/lessons", authenticateToken, requireAdmin, createLesson);

// GET /lessons/:lessonId - Get specific lesson (Public)
router.get("/lessons/:lessonId", getLessonById);

// PUT /lessons/:lessonId - Update lesson (Admin only)
router.put("/lessons/:lessonId", authenticateToken, requireAdmin, updateLesson);

// DELETE /lessons/:lessonId - Delete lesson (Admin only)
router.delete("/lessons/:lessonId", authenticateToken, requireAdmin, deleteLesson);

export default router;

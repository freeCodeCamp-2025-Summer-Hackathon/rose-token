import { Router } from "express";
import {
  listLessonsByCategory,
  createLessonInCategory,
  getLessonById,
  updateLessonById,
  deleteLessonById,
} from "../controller/lesson.controller";

const router = Router();

router.get(
  "/categories/:categoryId/lessons",
  listLessonsByCategory
);
router.post(
  "/categories/:categoryId/lessons",
  createLessonInCategory
);
router.get("/lessons/:lessonId", getLessonById);
router.put("/lessons/:lessonId", updateLessonById);
router.delete("/lessons/:lessonId", deleteLessonById);

export default router;

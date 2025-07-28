import { Router } from "express";
import { 
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getFilteredLessonsController,
  getFilteredPostsController,
  getAllTagsController
} from "../controller/category.controller";
import { authenticateToken, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

// Admin routes - require authentication and admin privileges
router.post("/categories", authenticateToken, requireAdmin, createCategory);
router.put("/categories/:id", authenticateToken, requireAdmin, updateCategory);
router.delete("/categories/:id", authenticateToken, requireAdmin, deleteCategory);

// Public routes - no authentication required
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

// Filter routes - public access for browsing content
router.get('/lessons/filter', getFilteredLessonsController);
router.get('/posts/filter', getFilteredPostsController);
router.get('/tags', getAllTagsController);

export default router;

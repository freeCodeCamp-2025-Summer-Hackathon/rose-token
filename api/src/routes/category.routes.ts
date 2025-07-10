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

const router=Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// GET /api/categories/lessons/filter - Filter lessons by category and tags (public)
router.get('/lessons/filter', getFilteredLessonsController);

// GET /api/categories/posts/filter - Filter posts by category and tags (public)  
router.get('/posts/filter', getFilteredPostsController);

// GET /api/categories/tags - Get all unique tags (public)
router.get('/tags', getAllTagsController);

export default router;

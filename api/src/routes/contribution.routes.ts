import { Router } from "express";
import {
  listContributionsByCategory,
  createContributionInCategory,
  getContributionById,
  updateContributionById,
  deleteContributionById,
} from "../controller/contribution.controller";

const router = Router();
router.get(
  "/categories/:categoryId/contributions",
  listContributionsByCategory
);
router.post(
  "/categories/:categoryId/contributions",
  createContributionInCategory
);
router.get("/contributions/:id", getContributionById);
router.put("/contributions/:id", updateContributionById);
router.delete("/contributions/:id", deleteContributionById);

export default router;

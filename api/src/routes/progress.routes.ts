import { Router } from "express";
import { incrementProgressController, getUserProgressController } from "../controller/progress.controller";

const router = Router();

router.post("/:id/progress", incrementProgressController);
router.get("/:id/progress", getUserProgressController);

export default router;

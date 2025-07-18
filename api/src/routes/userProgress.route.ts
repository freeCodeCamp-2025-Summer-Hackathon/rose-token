import { Router } from "express";
import {
	getAllProgressOfUser,
	getProgressOfUserForLesson,
} from "../controller/userProgressController";

const router = Router();

router.get("/:userId/progress", getAllProgressOfUser);
router.get("/:userId/progress/lessons/:lessonId", getProgressOfUserForLesson);
router.get("/:userId/progress/exercises/:exerciseId", getAllProgressOfUser);

export default router;

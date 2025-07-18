import { Router } from "express";
import {
	getAllProgressOfUser,
	getProgressOfUserForExcercise,
	getProgressOfUserForLesson,
	updateProgressOfUserForLesson,
} from "../controller/userProgressController";

const router = Router();

router.get("/:userId/progress", getAllProgressOfUser);
router.get("/:userId/progress/lessons/:lessonId", getProgressOfUserForLesson);
router.get(
	"/:userId/progress/exercises/:exerciseId",
	getProgressOfUserForExcercise
);
router.patch(
	"/:userId/progress/lessons/:lessonId",
	updateProgressOfUserForLesson
);

export default router;

import { Router } from "express";
import { getCoursesController } from "../controller/course.controller";

const router = Router();

router.get("/courses", getCoursesController);

export default router;
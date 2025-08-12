import { Router } from "express";
import { getLearnContentController } from "../controller/learn.controller";

const router = Router();

router.get("/learn/:language", getLearnContentController);

export default router;
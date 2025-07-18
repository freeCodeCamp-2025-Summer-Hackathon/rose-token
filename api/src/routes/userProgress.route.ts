import { Router } from "express";
import { getAllProgressOfUser } from "../controller/userProgressController";

const router = Router();

router.get("/:userId/progress", getAllProgressOfUser);
export default router;

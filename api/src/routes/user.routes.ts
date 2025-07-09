import { Router } from "express";
import { me } from "../controller/user.controller";
import { post } from "../controller/post.controller";

const router = Router();

router.get("/me", me);
router.post("/post", post)
export default router;

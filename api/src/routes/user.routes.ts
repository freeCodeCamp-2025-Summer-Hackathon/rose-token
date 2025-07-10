import { Router } from "express";
import { me } from "../controller/user.controller";
import { post, getAllPosts, getPostbyId, getPostbyAuthorId } from "../controller/post.controller";

const router = Router();

router.get("/me", me);
router.post("/post", post)
router.get("/all", getAllPosts)
router.get("/postid", getPostbyId)
router.get("/posts/author", getPostbyAuthorId)
export default router;

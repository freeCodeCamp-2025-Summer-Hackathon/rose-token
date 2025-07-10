import { Router } from "express";
import { me } from "../controller/user.controller";
import { post, getAllPosts, getPostbyId, getPostbyAuthorId, postUpdate,} from "../controller/post.controller";

const router = Router();

router.get("/me", me);
router.post("/posts", post)
router.get("/posts", getAllPosts)
router.get("/posts/:id", getPostbyId)
router.get("/posts/author/:author", getPostbyAuthorId)
router.patch("/posts/:id", postUpdate)

export default router;

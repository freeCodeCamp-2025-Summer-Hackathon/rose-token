import { Router } from "express";
import { me } from "../controller/user.controller";
import { deletePostsbyId, getDiscussionPosts, getMainPosts, post, postUpdate, postbySlug} from "../controller/post.controller";

const router = Router();

router.get("/me", me);
router.post("/posts", post)
router.post("/posts/:slug", postbySlug)
router.get("/posts", getMainPosts)
router.get("/posts/:slug", getDiscussionPosts)
router.patch("/posts/:id", postUpdate)
router.delete("/posts/:id/delete", deletePostsbyId);

export default router;

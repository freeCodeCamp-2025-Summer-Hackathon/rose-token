import { Router } from "express";
import { me } from "../controller/user.controller";
import { post, postUpdate, allPosts, postbyId, postsbyAuthorId, deletePostsbyId} from "../controller/post.controller";

const router = Router();

router.get("/me", me);
router.post("/posts", post)
router.get("/posts", allPosts)
router.get("/posts/:id", postbyId)
router.get("/posts/author/:author", postsbyAuthorId)
router.patch("/posts/:id", postUpdate)
router.patch("/posts/:id/delete", deletePostsbyId);

export default router;

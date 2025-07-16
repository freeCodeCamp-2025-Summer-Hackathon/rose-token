import { Router } from "express";
import { me } from "../controller/user.controller";
import { comment, allComment, deleteCommentById, patchComment } from "../controller/comment.controller";
import { deletePostsbyId, getDiscussionPosts, getMainPosts, post, postUpdate, postbySlug} from "../controller/post.controller";


const router = Router();

router.get("/me", me);
router.post("/posts", post)
router.post("/posts/:slug", postbySlug)
router.get("/posts", getMainPosts)
router.get("/posts/:slug", getDiscussionPosts)
router.patch("/posts/:id", postUpdate)
router.delete("/posts/:id/delete", deletePostsbyId);

router.get("/posts/:id/comments", allComment)
router.post("/posts/:id/comments", comment)
router.patch("/posts/:id/comments/:id", patchComment)
router.delete("/posts/:id/comments/:id/delete", deleteCommentById)


export default router;

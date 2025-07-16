import { Router } from "express";
import { me } from "../controller/user.controller";
import { post, postUpdate, allPosts, postbyId, postsbyAuthorId,} from "../controller/post.controller";
import { comment, allComment, deleteCommentById, patchComment } from "../controller/comment.controller";

const router = Router();

router.get("/me", me);
router.post("/posts", post)
router.get("/posts", allPosts)
router.get("/posts/:id", postbyId)
router.get("/posts/author/:author", postsbyAuthorId)
router.patch("/posts/:id", postUpdate)

router.get("/posts/:id/comments", allComment)
router.post("/posts/:id/comments", comment)
router.patch("/posts/:id/comments/:id", patchComment)
router.delete("/posts/:id/comments/:id/delete", deleteCommentById)


export default router;

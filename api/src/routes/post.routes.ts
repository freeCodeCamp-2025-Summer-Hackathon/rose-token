

//post routes

import { Router } from "express";
import {
  post,
  postUpdate,
  postbySlug,
  getDiscussionPosts,
  getMainPosts,
  deletePostsbyId,
} from "../controller/post.controller";

import { comment, allComment, deleteCommentById, patchComment } from "../controller/comment.controller";


const router = Router();

router.post("/", post)
router.post("/:slug", postbySlug)
router.get("/", getMainPosts)
router.get("/:slug", getDiscussionPosts)
router.patch("/:id", postUpdate)
router.delete("/:id/delete", deletePostsbyId);

router.get("/:id/comments", allComment)
router.post("/:id/comments", comment)
router.patch("/:id/comments/:id", patchComment)
router.delete("/:id/comments/:id/delete", deleteCommentById)

export default router;

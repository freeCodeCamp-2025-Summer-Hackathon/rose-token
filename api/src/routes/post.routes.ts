

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

const router = Router();

router.post("/", post);
router.put("/:id", postUpdate);
router.get("/slug/:slug", postbySlug);
router.get("/discussions", getDiscussionPosts);
router.get("/main", getMainPosts);
router.delete("/:id", deletePostsbyId);

export default router;

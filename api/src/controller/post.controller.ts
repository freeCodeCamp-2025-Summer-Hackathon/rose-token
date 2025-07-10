import { Request, Response } from "express";
import { createPost, getAllPosts, getPostById, getPostsByAuthorId, updatePost } from "../services/post.services";
import prisma from "../services/prisma";

export const post = async (req: Request, res: Response) => {
    try{
        const post = await createPost(req.body);
        console.log(post);
        res.status(201).json({ post });
    } catch (error) {
        console.error("Error in /post:", error);
        res.status(500).json({ message: error });
    }
}

export const postUpdate = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        console.log('Post ID from params:', id); // Debug log
        if (!id) {
            res.status(400).json({ message: 'Post ID is required' });
        }
        const post = await updatePost(req.body, id);
        res.status(200).json({post})
    } catch (error) {
        console.error("Error in updating your post:", error);
        res.status(500).json({ message: error });
    }
}

export const allPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json({
      status: true,
      message: "posts successfully fetched",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch posts"
    });
  }
}

export const postbyId = async ( req: Request, res: Response) => {
    try {
    const { postId } = req.params;
    const post = await getPostById(postId);
    
    res.status(200).json({
      status: true,
      message: "post successfully fetched by id",
      data: post,
    });
  } catch (error) {
    console.error("error fetching post:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch post by id"
    });
  }
}

export const postsbyAuthorId = async ( req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const posts = await getPostsByAuthorId(id);
    
    res.status(200).json({
      status: true,
      message: "posts successfully fetched by author id",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch posts by author id"
    });
  }
}
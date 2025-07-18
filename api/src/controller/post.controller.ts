import { Request, Response } from "express";
import { createPost, updatePost, createPostbySlug, getAllMainPosts, getRelatedPosts, deletePosts, getPostByCategory } from "../services/post.services";
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

export const postbySlug = async(req: Request, res: Response) => {
  try{
    const {slug} = req.params;
    const post = await createPostbySlug(slug, req.body);
    res.status(201).json({post})
  }
  catch(error){
    res.status(500).json({
      status: false,
      message: "Failed to create post"
    })
  }
}

export const getMainPosts = async(request: Request, response: Response) => {
  try{
    const posts = await getAllMainPosts();
    response.status(200).json({posts})
  }
  catch(error){
    response.status(500).json({
      status: false,
      message: "couldnt fetch main posts"
    })
  }
}

export const getDiscussionPosts = async(request: Request, response: Response) => {
  try{
    const {slug} = request.params;
    const posts = await getRelatedPosts(slug)
    response.status(200).json({posts})
  }
  catch(error){
    response.status(500).json({
      status: false,
      message: "Failed to fetch discussion"
    })
  }
}

export const deletePostsbyId = async (req: Request, res: Response) =>{
  try{
    const {id} = req.params;
    //console.log(id) //for debugging 
    
    const post = await deletePosts(id);
    res.status(200).json({
      status: true,
      message: "post deleted successfully",
      data: post
    })
  }
  catch(error){
    res.status(500).json({
      status: false,
      message: "Failed to delete the post"
    })
  }
}

export const getPostCategory = async(request: Request, response: Response) => {
  try{
    const {id} = request.params;
    const category = await getPostByCategory(id)
    response.status(200).json({category})
  }
  catch(error){
    response.status(500).json({
      status: false,
      message: "Failed to fetch post by category"
    })
  }
}
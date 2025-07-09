import { Request, Response } from "express";
import { createPost } from "../services/post.services";

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
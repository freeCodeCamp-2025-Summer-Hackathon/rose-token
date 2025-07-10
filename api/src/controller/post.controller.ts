import { Request, Response } from "express";
import { createPost } from "../services/post.services";
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

export const getAllPosts = async (req: Request, res: Response) => {
    try{
        const posts = await prisma.post.findMany();
        res.status(200).json({
            status: true,
            message: "posts successfully fetched",
            data: posts,
        });
    } catch(error){
        console.error("Error fetching posts:", error);
        res.status(500).json({
            status: false,
            message: "Failed to fetch posts"
        });
    }
}

export const getPostbyId = async ( req: Request, res: Response) => {
    try{
        const { postId } = req.params;
        const post = await prisma.post.findFirst({
            where: {
                id: postId,
            },
            include: {
                author: true,
            }
        });
        res.status(200).json({
            status: true,
            message: "post successfully fetched by id",
            data: post,
        })
    } catch(error){
        console.error("Error fetching post:", error);
        res.status(500).json({
            status: false,
            message: "Failed to fetch post by id"
        });
    }
}

export const getPostbyAuthorId = async ( req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const post = await prisma.post.findMany({
            where: {
                authorId: id,
            },
            include: {
                author: true,
            }
        });
        res.status(200).json({
            status: true,
            message: "post successfully fetched by author id",
            data: post,
        })
    } catch(error){
        console.error("Error fetching post:", error);
        res.status(500).json({
            status: false,
            message: "Failed to fetch post by author id"
        });
    }
}
import { Request, Response } from "express";
import prisma from "./prisma";
import { getPostById } from "./post.services";

interface CommentFormat{
    body:string,
    authorId:string,
    postId:string
}

export async function createComment(data: CommentFormat){
    try{
        const { body, authorId, postId} = data;

        const userExists = await prisma.user.findUnique({
        where: {
            id: authorId
        },
        select: {
            id: true
        }
        })

        if(!userExists) throw new Error("User not found");

        const comment = await prisma.comment.create({
            data: {
                body,
                authorId,
                postId,
                slug: `${body.split(" ").join("-").toLowerCase()}-${Date.now().toString(36)}`,
                createdAt: new Date(),
            },
            select: {
                id: true,
                body: true,
                slug: true,
                postId: true,
                author: true,
                createdAt: true,
                authorId: true,
            }
        })

        return comment;
    } catch (error){
        console.log('Error creating comment:', error);
        throw error
    }
}

export async function getAllComments(){
    try {
        const comments = await prisma.comment.findMany({
        include: {
            postId:true,
            author: true,
        }
        });
        
        return comments;
    } catch (error) {
        console.error('Error fetching all comments:', error);
        throw error;
    }
}

export async function getCommentById(postId: string){
    try{
        const comment = await prisma.comment.findFirst({
            where: { postId: postId },
            include:{
                author: true,
            }
        })

        if(!comment){
            throw new Error("Post doesn't exist")
        }
    } catch (error){
        console.error("Error fetching comment by post ID:", error);
        throw error;
    }
}

export async function getCommentsByAuthorId(authorId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { authorId: authorId },
      include: {
        author: true,
      }
    });
    
    return comments;
  } catch (error) {
    console.error('Error fetching comments by author ID:', error);
    throw error;
  }
}


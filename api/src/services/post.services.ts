import { Request, Response } from "express";
import prisma from "./prisma";

interface PostFormat{
  title:string,
  body:string,
  authorId:string,
}

export async function createPost(data: PostFormat) {
  try {
    const { title, body, authorId } = data;
    
    const userExists = await prisma.user.findUnique({
      where: {
        id: authorId
      },
      select: {
        id: true
      }
    })

    if(!userExists) throw new Error("User not found");

    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId,
        slug: `${title.split(" ").join("-").toLowerCase()}-${Date.now().toString(36)}`,
        createdAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        body: true,
        slug: true,
        author: true,
        createdAt: true,
        authorId: true,
      }
    });
    
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(updatedData: PostFormat, postid:string){
  try{
    const post = await prisma.post.findFirst({
      where: {id : postid},
    })
    if (!post) throw new Error("Post not found")
    const updatedPost = await prisma.post.update({
      where: {id: postid,},
      data: updatedData,
    })
    return updatedPost;
  }catch(error){
    console.error('Error updating post:', error);
    throw error;
  }
}


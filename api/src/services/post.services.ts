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
    console.log(data)
    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId,
        slug: `${title.split(" ").join("-").toLowerCase()}`,
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

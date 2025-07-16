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

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: {
        author: true,
      }
    });
    
    if (!post) {
      throw new Error("Post not found");
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}

export async function getPostsByAuthorId(authorId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: authorId },
      include: {
        author: true,
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts by author ID:', error);
    throw error;
  }
}


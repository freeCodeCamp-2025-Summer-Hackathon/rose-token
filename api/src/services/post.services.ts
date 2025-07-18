import { connect } from "http2";
import prisma from "./prisma";
import { v4 as uuidv4 } from 'uuid';

interface PostFormat{
  title:string,
  body:string,
  authorId:string,
  categoryId: string[]
}

export async function createPost(data: PostFormat) {
  try {
    const { title, body, authorId, categoryId } = data;
    
    const userExists = await prisma.user.findUnique({
      where: {
        id: authorId
      }
    })

    if(!userExists) throw new Error("User not found");

    const post = await prisma.post.create({
      data: {
        title,
        body,
        authorId,
        slug: `${title.split(" ").join("-").toLowerCase()}-${uuidv4()}`,
        createdAt: new Date(),
        isMainPost: true,
        categories: {
          create: categoryId.map(id => ({
            category: { connect: {id} }
          }))
        }
      },
      include:{
        author: {
          select:{
            username: true,
            id: true,
            name: true,
            email: true,
          }
        }
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

export async function createPostbySlug(slug: string, data: PostFormat){
  try{
    const {body, authorId} = data;
    const title = await prisma.post.findFirst({
      where: {slug: slug, isMainPost: true},
      select: {title: true}
    })
    const post = await prisma.post.create({
      data:{
        title: title?.title || "none",
        body,
        authorId,
        slug: slug,
        createdAt: new Date(),
        isMainPost: false,
      },
      include:{
        author: {
          select:{
            username: true,
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })
    return post;
  }
  catch(error){
    console.error('Error creating post by slug:', error);
    throw error;
  }
}

export async function getAllMainPosts(){
  try{
    const posts = await prisma.post.findMany({
      where: {isMainPost: true},
      include: {
        author: true,
        comments: true,
      }
    })
    return posts;
  }
  catch(error){
    console.error('Error fetching all main posts:', error);
    throw error;
  }
}

export async function getRelatedPosts(slug: string){
  try{
    const posts = await prisma.post.findMany({
      where: {slug: slug},
      include: {
        author: {
          select:{
            username: true,
            id: true,
            name: true,
            email: true,
          }
        },
        comments: true,
      }
    })
    return posts;
  }
  catch(error){
    console.error('Error fetching related posts:', error);
    throw error;
  }
}

export const deletePosts = async (postId: string)=>{
  try{

    const post = await prisma.post.findFirst({
      where: {id: postId}
    })

    if(!post) throw new Error ("post not found")

    const deletePost = await prisma.post.update({
      where: {id: postId},
      data: {
        status: "DELETED"
      },
      select: {
        status: true,
      }
    })

    return deletePost;
  }
  catch(error){
    console.error('Error in deleting posts: ', error);
    throw error;
  }
}

export const getPostByCategory = async (categoryId: string) => {
  try{
    const category = await prisma.postCategory.findFirst({
      where: { id: categoryId,}, 
      include: {
        post: true,
        category: true
      }
    })
    return category 
  } catch(error){
    console.log("Error in fetching post by category: ", error)
    throw error;
  }
}
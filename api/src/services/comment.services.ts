import prisma from "./prisma";

interface CommentFormat{
    comment:string,
    author:string,
    postId:string
}

export async function createComment(data: CommentFormat){
    try{
        const { comment, author, postId} = data;

        const userExists = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            id: true
        }
        })

        if(!userExists) throw new Error("User not found");

        const createComment = await prisma.comment.create({
            data: {
                comment,
                postId,
                date: new Date(),
            },
            select: {
                id: true,
                comment: true,
                postId: true,
                date: true,
                post: true
            }
        })

        return createComment;
    } catch (error){
        console.log('Error creating comment:', error);
        throw error
    }
}

export async function getAllComments(postId:string){
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId
            },
            include: {
                post:true,
            }
        });
        
        return comments;
    } catch (error) {
        console.error('Error fetching all comments:', error);
        throw error;
    }
}

export async function deleteComment(commentId:string){
    try{
        const existingComment = await prisma.comment.findUnique({
            where: {id: commentId},
            select: {id: true}
        });

        if(!existingComment) throw new Error("Comment not found");

        const deleteComment = await prisma.comment.delete({
            where: { id: commentId},
            select: {
                id: true,
                comment: true,
                postId: true,
                date: true,
            }
        });

        return deleteComment
    } catch (error){
        console.log('Error deleting comment:', error);
        throw error
    }
}

export async function updateComment(commentId:string, newComment:string){
    try{
        const existingComment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true }
        });

        if(!existingComment) throw new Error("Comment doesn't exist!");

        const updateComment = await prisma.comment.update({
            where: { id: commentId},
            data: { 
                comment:newComment,
                date: new Date()
            },
            select: {
                id: true,
                comment: true,
                postId: true,
                date:true
            }
        });

        return updateComment;
    } catch (error){
        console.error("Error fetching comment by post ID:", error);
        throw error;
    }

}
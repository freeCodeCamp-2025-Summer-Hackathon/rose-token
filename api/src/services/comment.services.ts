import prisma from "./prisma";

interface CommentFormat{
    comment:string,
    postId:string,
    authorId: string
}

interface UpdateCommentFormat{
    id: string,
    comment:string,
    authorId:string,
    postId:string
}

export async function createComment(data: CommentFormat){
    try{
        const { comment, postId, authorId} = data;

        const userExists = await prisma.user.findUnique({
            where: {
                id: authorId
            },
            select: {
                id: true
            }
        })

        if(!userExists) throw new Error("User not found");

        const createComment = await prisma.comment.create({
            data: {
                authorId,
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

export async function updateComment(data: UpdateCommentFormat){
    try{
        const { comment, authorId, postId, id} = data;

        const userExists = await prisma.user.findUnique({
            where: {
                id: authorId,
            },
            select: {
                id: true
            }
        })

        if(!userExists) throw new Error("User not found");

        const updateComment = await prisma.comment.update({
            where: {
                id: id
            },
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

        return updateComment;
    } catch (error){
        console.log('Error creating comment:', error);
        throw error
    }
}
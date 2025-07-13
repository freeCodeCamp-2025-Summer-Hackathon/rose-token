import { Request, Response } from "express";
import { createComment, getCommentsByAuthorId, getAllComments, getCommentById, deleteComment, updateComment } from "../services/comment.services";

export const comment = async (req: Request, res: Response) => {
    try{
        const comment = await createComment(req.body);
        console.log(comment);
        res.status(201).json({ comment });
    } catch (error) {
        console.error("Error in /comment:", error);
        res.status(500).json({ message: error });
    }
}

export const allComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params
    const comment = await getAllComments(postId);
    
    res.status(200).json({
      status: true,
      message: "Comment successfully fetched",
      data: comment,
    });
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch comment"
    });
  }
}

export const commentbyId = async ( req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const comment = await getCommentById(id);
    
    res.status(200).json({
      status: true,
      message: "comment successfully fetched by id",
      data: comment,
    });
  } catch (error) {
    console.error("error fetching comment:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch comment by id"
    });
  }
}

export const commentbyAuthorId = async ( req: Request, res: Response) => {
    try {
    const { authorId } = req.params;
    const comment = await getCommentsByAuthorId(authorId);
    
    res.status(200).json({
      status: true,
      message: "comment successfully fetched by author id",
      data: comment,
    });
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch comment by author id"
    });
  }
}

export const deleteCommentById = async ( req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const delComment = await deleteComment(id);

        res.status(200).json({
        status: true,
        message: "comment successfully fetched by author id",
        data: delComment,
        });
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).json({
        status: false,
        message: "Failed to fetch comment by author id"
        });
    }
}

export const patchComment = async ( req: Request, res: Response) => {
  try{
      const { id, body } = req.params;
      const patchComment = await updateComment(id, body);
      res.status(200).json({
      status: true,
      message: "comment successfully fetched by author id",
      data: patchComment,
    });
  } catch (error) {
      console.error("Error fetching comment:", error);
      res.status(500).json({
      status: false,
      message: "Failed to fetch comment by author id"
    });
  }     
}
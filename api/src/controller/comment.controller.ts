import { Request, Response } from "express";
import { createComment, getAllComments, deleteComment, updateComment } from "../services/comment.services";

export const comment = async (req: Request, res: Response) => {
    try{
        const comment = await createComment(req.body);
        console.log(comment);
        res.status(201).json({ comment });
    } catch (error) {
        console.error("Error in /posts/:id/comments:", error);
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
      const { id, comment } = req.params;
      const patchComment = await updateComment(req.body);
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
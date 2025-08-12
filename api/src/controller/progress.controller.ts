import { Request, Response } from "express";
import { incrementProgress, getUserProgress } from "../services/progress.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const incrementProgressController = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Cannot update progress" });
    }

    const updatedUser = await incrementProgress(id);
    return new ApiResponse( 201 , updatedUser , "Updated progress" ).send(res)

  } catch (error) {
    console.error("Error incrementing progress:", error);
    throw new ApiError(500, 'Error creating');
  }
})

export const getUserProgressController = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, 'User id required');
    }

    const user = await getUserProgress(id);

    if (!user) {
      throw new ApiError(404, 'Error fetching user');
    }

    return new ApiResponse(201 , user , "Fetched user" ).send(res)
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw new ApiError(500, 'Error creating');
  }
})
// src/controllers/contribution.controller.ts
import { Request, Response } from "express";
import { createContribution } from "../services/contribution.service";
import { getAllContributions } from "../services/contribution.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const handleCreateContribution = asyncHandler(async (req, res) => {
  try {
    const { type, content, category, difficulty, language, frontText, backText, noteText } = req.body;

    const userId = "68929dd13f1acbe5114c1077";

    const contribution = await createContribution({
      type,
      content,
      category,
      difficulty,
      language,
      userId,
      frontText,
      backText,
      noteText
    });

    //return res.status(201).json(contribution);
    return new ApiResponse( 201 , contribution , "Contrib Created" ).send(res);
  } catch (err) {
    console.error("Create Contribution Error:", err);
    throw new ApiError(500, 'Error creating');
  }
});

export const getContributionsController = async (req: Request, res: Response) => {
  try {
    const contributions = await getAllContributions();
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
};

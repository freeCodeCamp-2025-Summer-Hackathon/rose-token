// src/controllers/contribution.controller.ts
import { Request, Response } from "express";
import { createContribution } from "../services/contributionn.service";

export const handleCreateContribution = async (req: Request, res: Response) => {
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

    return res.status(201).json(contribution);
  } catch (err) {
    console.error("Create Contribution Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

import { Request, Response } from "express";
import { getLearningContentByLanguage } from "../services/learn.service";

export const getLearnContentController = async (req: Request, res: Response) => {
  try {
    const { language } = req.params;
    const content = await getLearningContentByLanguage(language);

    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch learning content" });
  }
};

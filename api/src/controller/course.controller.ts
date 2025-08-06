import { Request, Response } from "express";
import { getAllCourses } from "../services/course.service";

export const getCoursesController = async (req: Request, res: Response) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

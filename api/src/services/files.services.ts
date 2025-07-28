import { Request, Response } from "express";
import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import prisma from "./prisma";
import { randomUUID } from "crypto";
import path from "path";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export interface FileData {
  filename: string;
  originalName: string;
  path: string;
  mimetype: string;
  size: number;
  uploaderId: string;
  categoryIds?: string[];
  tagIds?: string[];
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + randomUUID();
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "audio/mpeg",
    "audio/wav",
    "audio/wave",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Invalid file type, only JPEG, PNG, MP3 and WAV are allowed!"
      )
    );
  }
};

// 🧾 Multer Upload Middleware
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
});

export const handleError = async (
  err: Error,
  res: Response,
  filePath: string | null
) => {
  if (filePath && fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }

  if (
    err.message ===
    "Invalid file type, only JPEG, PNG, MP3 and WAV are allowed!"
  ) {
    return new ApiResponse(400, null, err.message).send(res);
  }

  return new ApiResponse(
    500,
    null,
    "An unknown error occurred during upload."
  ).send(res);
};

export const saveFileDataToDb = async (data: FileData) => {
  try {
    const {
      filename,
      originalName,
      path: filePath,
      mimetype,
      size,
      uploaderId,
      categoryIds,
      tagIds,
    } = data;

    const safePath = filePath.replace(/\\/g, "/");

    const createdContentFile = await prisma.contentFile.create({
      data: {
        filename,
        originalName,
        path: safePath,
        mimetype,
        size: Math.round(size / 1024), // size in KB
        uploaderId,
        categoryIds: categoryIds ?? [],
        tagIds: tagIds ?? [],
      },
      select: {
        id: true,
      },
    });

    return createdContentFile;
  } catch (error) {
    throw new ApiError(500, "Failed to save file metadata", [], (error as any).stack);
  }
};

import { Router, Request, Response, NextFunction } from "express";
import { uploadFile } from "../controller/files.controller";
import { upload } from "../services/files.services";
import multer from "multer";
import fs from "fs";
import path from "path";

import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);


router.get(
  "/file/:filename",
  asyncHandler(async (req: Request, res: Response) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "..", "uploads", filename);

    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return res.sendFile(filePath);
    } catch (err) {
      throw new ApiError(404, "File not found");
    }
  })
);

// Multer-specific error handler
router.use(
  (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        new ApiResponse(400, null, "Please upload a file smaller than 5MB.").send(res);
        return;
      } else {
        new ApiResponse(400, null, err.message).send(res);
        return;
      }
    }

    if (err) {
      const message = err.message || "Unexpected error occurred";
      new ApiResponse(400, null, message).send(res);
      return;
    }

    next();
  }
);

export default router;

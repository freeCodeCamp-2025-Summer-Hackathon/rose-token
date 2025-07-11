import { Router, Request, Response, NextFunction } from "express";
import { uploadFile } from "../controller/files.controller";
import { upload } from "../services/files.services";
import multer from "multer";

const router = Router();
router.post("/upload", upload.single("file"), uploadFile);

// to hanlde multer error
router.use(
	(err: any, req: Request, res: Response, next: NextFunction): void => {
		if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_FILE_SIZE") {
				res.status(400).json({
					error: "Please upload a file smaller than 5MB.",
				});
				return;
			} else {
				res.status(400).json({ error: err.message });
				return;
			}
		}
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		next();
	}
);

export default router;

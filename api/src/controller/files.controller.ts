import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import fileType from "file-type";
import { handleError } from "../services/files.services";

export const uploadFile = async (req: Request, res: Response) => {
	try {
		const file = req.file;
		if (!file) {
			res.status(400).send("No file uploaded.");
			return;
		}

		const filePath = path.join("uploads", file.filename);
		const buffer = fs.readFileSync(filePath);
		const type = await fileType.fileTypeFromBuffer(buffer);

		// Check file type for the allowed types
		if (
			!type ||
			![
				"image/jpeg",
				"image/png",
				"audio/mpeg",
				"audio/wav",
				"audio/wave",
			].includes(type.mime)
		) {
			// Delete the invalid file
			fs.unlinkSync(filePath);
			res.status(400).send("Invalid file content type!");
		}
		// here save the file to db
		// and finally
		res.status(200).send("File uploaded successfully.");
	} catch (error: any) {
		const filePath = req.file ? path.join("uploads", req.file.filename) : null;
		handleError(error, res, filePath);
	}
};

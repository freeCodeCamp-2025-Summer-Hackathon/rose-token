import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import fileType from "file-type";
import { handleError, saveFileDataToDb } from "../services/files.services";
import { decodedId } from "../services/user.services";
import prisma from "../services/prisma";

export const uploadFile = async (req: Request, res: Response) => {
	try {
		// -------------get user detail can letter be replace with middleware
		const { token } = req.cookies;
		if (!token) {
			res.status(401).json({ message: "No token provided" });
		}

		const id = decodedId(token);

		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
			},
		});

		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		// --------------check if got file or not can letter be replace with middleware
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
			return;
		}
		// here save the file to db
		await saveFileDataToDb({
			filename: file.filename,
			originalName: file.originalname,
			path: filePath,
			mimetype: type.mime,
			size: file.size,
			uploaderId: id,
		});
		// and finally
		res.status(200).send("File uploaded successfully.");
	} catch (error: any) {
		const filePath = req.file ? path.join("uploads", req.file.filename) : null;
		handleError(error, res, filePath);
	}
};

import { Request, Response } from "express";
import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import prisma from "./prisma";
import { randomUUID } from "crypto";

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

// Configure storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniquePrefix = Date.now() + "-" + randomUUID();
		cb(null, uniquePrefix + "-" + file.originalname);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback | any
) => {
	if (
		[
			"image/jpeg",
			"image/png",
			"audio/mpeg",
			"audio/wav",
			"audio/wave",
		].includes(file.mimetype)
	) {
		cb(null, true);
	} else {
		cb(
			new Error("Invalid file type, only JPEG, PNG, MP3 and WAV are allowed!"),
			false
		);
	}
};

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB limit
	},
	fileFilter: fileFilter,
});

export const handleError = (
	err: Error,
	res: Response,
	filePath: string | null
) => {
	// Delete the file if it exists
	if (filePath && fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
	if (
		err.message ===
		"Invalid file type, only JPEG, PNG, MP3 and WAV are allowed!"
	) {
		res.status(400).send(err.message);
	}
	res.status(500).send("An unknown error occurred when uploading.");
};

export const saveFileDataToDb = async (data: FileData) => {
	try {
		const {
			filename,
			originalName,
			path,
			mimetype,
			size,
			uploaderId,
			categoryIds,
			tagIds,
		} = data;

		const filePathInDb = path.replace(/\\/g, "/"); //----  to replace \ with /

		const createdContentFile = await prisma.contentFile.create({
			data: {
				filename,
				originalName,
				path: filePathInDb,
				mimetype,
				size, //---- will be in KB
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
		throw error;
	}
};

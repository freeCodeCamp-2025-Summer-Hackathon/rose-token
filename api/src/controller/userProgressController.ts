import prisma from "../services/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const getAllProgressOfUser = asyncHandler(async (req, res) => {
	const userIdForProgress = req.params.userId;

	const userProgresses = await prisma.userProgress.findMany({
		where: { userId: userIdForProgress },
	});

	return new ApiResponse(200, userProgresses).send(res);
});

export const getProgressOfUserForLesson = asyncHandler(async (req, res) => {});

export const getProgressOfUserForExcercise = asyncHandler(
	async (req, res) => {}
);

export const updateProgressOfUserForLesson = asyncHandler(
	async (req, res) => {}
);

export const updateProgressOfUserForExcercise = asyncHandler(
	async (req, res) => {}
);

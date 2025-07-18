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

export const getProgressOfUserForLesson = asyncHandler(async (req, res) => {
	const lessonId = req.params.lessonId;

	const userIdForProgress = req.params.userId;

	const userProgresses = await prisma.userProgress.findMany({
		where: { userId: userIdForProgress, lessonId },
	});

	return new ApiResponse(200, userProgresses).send(res);
});

export const getProgressOfUserForExcercise = asyncHandler(async (req, res) => {
	const exerciseId = req.params.exerciseId;

	const userIdForProgress = req.params.userId;

	const userProgresses = await prisma.userProgress.findMany({
		where: { userId: userIdForProgress, exerciseId },
	});

	return new ApiResponse(200, userProgresses).send(res);
});

export const updateProgressOfUserForLesson = asyncHandler(async (req, res) => {
	const exerciseId = req.params.exerciseId;

	const userIdForProgress = req.params.userId;
	const progressStatus = req.body.progressStatus;

	if (!progressStatus) {
		throw new ApiError(400, "Progress status is required");
	}

	const userProgresses = await prisma.userProgress.findFirst({
		where: { userId: userIdForProgress, exerciseId },
	});

	if (!userProgresses) {
		throw new ApiError(404, "Progress not found");
	}
	const updatedProgress = await prisma.userProgress.update({
		where: { id: userProgresses.id },
		data: {
			progressStatus,
		},
	});

	return new ApiResponse(200, updatedProgress).send(res);
});

export const updateProgressOfUserForExcercise = asyncHandler(
	async (req, res) => {}
);

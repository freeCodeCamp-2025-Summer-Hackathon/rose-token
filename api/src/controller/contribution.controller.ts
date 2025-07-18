// src/controllers/contributionController.ts
import { NextFunction, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { contributionService } from "../services/contribution.service";

enum Category {
  GRAMMAR = "GRAMMAR",
  VOCABULARY = "VOCABULARY",
  SPEAKING = "SPEAKING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
}

// 1) GET /categories/:categoryId/contributions
export const listContributionsByCategory = asyncHandler(
  async (req, res, next) => {
    const catParam = req.params.categoryId.toUpperCase() as Category;
    if (!Object.values(Category).includes(catParam)) {
      return new ApiResponse(400, null, "Invalid category").send(res);
    }
    const contributions =
      await contributionService.listContributionsByCategory(catParam);
    return new ApiResponse(
      200,
      contributions,
      "Contributions fetched successfully"
    ).send(res);
  }
);

// 2) POST /categories/:categoryId/contributions
export const createContributionInCategory = asyncHandler(
  async (req, res, next) => {
    const catParam = req.params.categoryId.toUpperCase() as Category;
    if (!Object.values(Category).includes(catParam)) {
      return new ApiResponse(400, null, "Invalid category").send(res);
    }

    const { title, type, tags, flashcardData, noteData } = req.body;
    if (!title || !type) {
      return new ApiResponse(400, null, "title and type are required").send(res);
    }
    if (!["flashcard", "note"].includes(type)) {
      return new ApiResponse(400, null, "Invalid type").send(res);
    }

    const contribution = await contributionService.createContribution({
      title,
      category: catParam,
      tags,
      type,
      flashcardData,
      noteData,
    });
    return new ApiResponse(
      201,
      contribution,
      "Contribution created successfully"
    ).send(res);
  }
);

// 3) GET /contributions/:id
export const getContributionById = asyncHandler(
  async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return new ApiResponse(400, null, "Invalid contribution ID").send(res);
    }
    const contribution = await contributionService.getContribution(id);
    if (!contribution) {
      return new ApiResponse(404, null, "Contribution not found").send(res);
    }
    return new ApiResponse(
      200,
      contribution,
      "Contribution retrieved successfully"
    ).send(res);
  }
);

// 4) PUT /contributions/:id
export const updateContributionById = asyncHandler(
  async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return new ApiResponse(400, null, "Invalid contribution ID").send(res);
    }

    const { title, tags, type, flashcardData, noteData } = req.body;
    const updateData: any = {};
    if (title) updateData.title = title;
    if (tags) updateData.tags = tags;
    if (type) {
      if (!["flashcard", "note"].includes(type)) {
        return new ApiResponse(400, null, "Invalid type").send(res);
      }
      updateData.type = type;
    }
    if (flashcardData) updateData.flashcardData = flashcardData;
    if (noteData) updateData.noteData = noteData;

    const contribution = await contributionService.updateContribution(
      id,
      updateData
    );
    return new ApiResponse(
      200,
      contribution,
      "Contribution updated successfully"
    ).send(res);
  }
);

// 5) DELETE /contributions/:id
export const deleteContributionById = asyncHandler(
  async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return new ApiResponse(400, null, "Invalid contribution ID").send(res);
    }
    await contributionService.deleteContribution(id);
    return new ApiResponse(
      200,
      null,
      "Contribution deleted successfully"
    ).send(res);
  }
);

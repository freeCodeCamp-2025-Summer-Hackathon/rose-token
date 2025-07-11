
import { Request, Response } from "express";
import { decodedId } from "../services/user.services";
import prisma from "../services/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";


export const me = asyncHandler(async (req, res) => {

    const { token } = req.cookies;
    if (!token) {
        return new ApiResponse(401, "No token provided").send(res);
    }

    const id = decodedId(token);

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
        }
    });

    if (!user) {

        return new ApiResponse(404, "User not found").send(res);
    }



    return new ApiResponse(200, user).send(res);



});
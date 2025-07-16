import { RequestHandler } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { decodedId } from "../services/user.services";
import prisma from "../services/prisma";

export const isAdmin:RequestHandler = asyncHandler(async(req,res,next) => {

    const { token } = req.cookies;
    if (!token) {
        throw new ApiError(401, "Unauthorized Request")
    }

    const id = decodedId(token);

    const currentUser = await prisma.user.findUnique({
        where: { id },
        select: {
            role:true
        }
    });

    if(!currentUser){
        throw new ApiError(401, "Current User not found")
    }

    if(currentUser.role === 'admin'){
        next()
    }
    else{
        throw new ApiError(403, 'Access forbidden: Admins only')
    }

})
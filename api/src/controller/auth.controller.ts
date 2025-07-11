import { Request, Response } from "express";
import * as authService from "../services/auth.services"
import { generateToken } from "../utils/generateToken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";


export const signup = asyncHandler(async(req,res)=>{

const user = await authService.signup(req.body);
        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });
 
      return new ApiResponse(200, { user }, "User SignUp successfully").send(res);
});


export const login = asyncHandler(async(req,res)=>{

  const user = await authService.login(req.body);
        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

     
 return new ApiResponse(200,{user},"User login successfully").send(res);
});

export const logout = async (req: Request, res: Response) => {
 
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({ message: "User logged out successfully" });
 
};

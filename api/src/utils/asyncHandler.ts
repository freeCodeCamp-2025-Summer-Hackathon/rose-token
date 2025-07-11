import { Request,Response,NextFunction,RequestHandler } from "express";
import { ApiError } from "./ApiError";


const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>):RequestHandler  => async(req,res,next)=>{ 
    try{
        await fn(req,res,next) 
    }
    catch(error : unknown){

        const err = error as ApiError;

        const statusCode:number = err.statusCode ?? 500;
        
        res.status(statusCode).json({
            success: err.success || false,
            message: err.message || "Internal Server Error",
            errors: err.errors || [],
            data: err.data || null,
            name: err.name || 'No Name',
            stack: err.stack || 'Empty Stack'
        })
    }
}

export {asyncHandler}
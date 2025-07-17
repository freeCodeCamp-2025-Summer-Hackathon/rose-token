import { RequestHandler } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as languageService from "../services/language.services";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { decodedId } from "../services/user.services";

const getAllLanguages:RequestHandler = asyncHandler(async (req,res) => {
    const allLanguageDetails = await languageService.getAllLanguages()
    return new ApiResponse( 200 , allLanguageDetails , "Fetched All Languages successfully !!" ).send(res);
})

const createLanguage:RequestHandler = asyncHandler(async (req,res) => {
    const languageDetails = await languageService.createLanguage(req.body);
    return new ApiResponse( 200 , languageDetails , "New Language Created successfully !!" ).send(res);
})

//Toggle Language course - join and leave course
const toggleLanguageCourse:RequestHandler = asyncHandler(async (req,res) => {
    
    const { token } = req.cookies;

    if (!token) {
        throw new ApiError(401, "Unauthorized Request")
    }
    
    const userid = decodedId(token);

    if ( !userid ){
        throw new ApiError(401, "Failed to decode token")
    }
    
    const {_id} = req.params;

    if (!_id) {
       throw new ApiError(400, 'Language ID is required') 
    }

    const languageToggleDetails = await languageService.toggleLanguageCourse(userid,_id);

    return new ApiResponse( 200 , languageToggleDetails , "Toggled Language course successfully !!" ).send(res);

})

const getLanguageDetails:RequestHandler = asyncHandler(async (req,res) => {

    const {languageId} = req.params;

    if (!languageId) {
       throw new ApiError(400, 'Language ID is required') 
    }

    const languageDetails = await languageService.getLanguageDetails(languageId);

    return new ApiResponse( 200 , languageDetails , "Language Details Fetched successfully !!" ).send(res);

})

const updateLanguageDetails:RequestHandler = asyncHandler(async (req,res) => {

    const {languageId} = req.params;

    if (!languageId) {
       throw new ApiError(400, 'Language ID is required') 
    }

    const updatedlanguageDetails = await languageService.updateLanguageDetails(req.body, languageId) 

    return new ApiResponse( 200 , updatedlanguageDetails , "Updated Language Details successfully !!" ).send(res);

})

const deleteLanguage:RequestHandler = asyncHandler(async (req,res) => {
    
    const {languageId} = req.params;

    if (!languageId) {
       throw new ApiError(400, 'Language ID is required') 
    }

    const deletedLanguage = await languageService.deleteLanguage(languageId)

    return new ApiResponse( 200 , deletedLanguage , "Deleted Language successfully !!" ).send(res);

})

export {
    getAllLanguages,
    createLanguage,
    toggleLanguageCourse,
    getLanguageDetails,
    updateLanguageDetails,
    deleteLanguage
}
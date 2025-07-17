import { Router } from "express";
import { createLanguage, deleteLanguage, getAllLanguages, getLanguageDetails, toggleLanguageCourse,  updateLanguageDetails } from "../controller/language.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";


const router = Router();

router.route("/").get( getAllLanguages);
router.route("/").post( isAdmin, createLanguage);
router.route("/:_id").put( toggleLanguageCourse); 
router.route("/:languageId").get( getLanguageDetails);
router.route("/id/:languageId").put(isAdmin, updateLanguageDetails);  //NOTE:- Changed PUT /languages/:languageId to PUT /languages/id/:languageId to avoid clash of PUT /languages/:_id and PUT /languages/:languageId
router.route("/:languageId").delete(isAdmin,deleteLanguage);


export default router;
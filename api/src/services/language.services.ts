import z from "zod";
import { ApiError } from "../utils/ApiError";
import prisma from "./prisma";


export const languageSchema = z.object({
  code: z.string().min(2, "Code is required"), 
  name: z.string().min(2, "Name is required"), 
  description: z.string().min(1, "Description is required").max(400,"Description should be less than 400 characters"),
});

type LanguageInput = z.infer<typeof languageSchema>;

export const getAllLanguages = async ( ) => {

    const fetchedLanguages = await prisma.language.findMany({
        orderBy: { name: "desc" },
    })
    
 
    return fetchedLanguages

}

export const createLanguage = async (data: LanguageInput ) => {
    
    const parsedData = languageSchema.safeParse(data);

    if (!parsedData.success) {
        const errors = parsedData.error.flatten();
        throw new ApiError(400, "Code / Name / Description is not valid" , [JSON.stringify(errors)]);
    }

    const {code , name , description} = parsedData.data;


    const existingLanguage = await prisma.language.findFirst({
        where:{
            OR: [
                {code:code},
                {name:name}
            ]
        }   
    }) 

    if (existingLanguage) {
        throw new ApiError(400,"Language already exists")
    }

    const languageCreated = await prisma.language.create({
        data: {
            code: code.toLowerCase(),
            name: name,
            description: description,
            joinedCount: 0,
            completedCount: 0
        }
    })

    if(!languageCreated){
        throw new ApiError(500,"Failed to Create New Language")
    }

    return languageCreated

}

//Toggle Language course - join and leave course
export const toggleLanguageCourse = async( userId : string , _id : string) => {

    //Steps :- 
    // 1) Get the courses array from user 
    // 2) check if the _id (language id) is present or not 
    // 3) If present decrement joinedCount and remove _id (language id) from courses 
    // 4) If not present the increment joinedCount and push _id (language id) to courses


    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            id: true,
            courses: true
        }
    })

    if (!user) throw new ApiError(404, "User not found");

    const isJoined = user.courses.includes(_id);

    const updatedCourses = isJoined ? user.courses.filter((languageId) => (languageId !== _id)) : [...user.courses, _id];
    
    const [updatedUser, updatedLanguage] = await prisma.$transaction([
        
        prisma.user.update({
            where:{
                id: userId
            },
            data: {
                courses: {
                    set: updatedCourses
                }
            },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                courses: true
            }
        }),

        prisma.language.update({
            where:{
                id: _id
            },
            data: {
                joinedCount: {
                    increment: isJoined ? -1 : 1
                }
            },
            select: {
                id: true,
                code: true,
                name: true,
                joinedCount: true
            }
        })

    ])

    if( !updatedUser || !updatedLanguage ) {
        throw new ApiError(500, "Failed to update joinedCount or courses");
    }
    
    return { updatedUser, updatedLanguage }
}

export const getLanguageDetails = async ( languageId : string ) => {

    const languageDetails = await prisma.language.findUnique({
        where:{
            id: languageId
        }
    })

    if(!languageDetails) {
        throw new ApiError(500,"Failed to Fetch Language Details")
    }

    return languageDetails

}

export const updateLanguageDetails = async ( data: LanguageInput , languageId : string ) => {

    const parsedData = languageSchema.safeParse(data);

    if (!parsedData.success) {
        const errors = parsedData.error.flatten();
        throw new ApiError(400, "Code / Name / Description is not valid" , [JSON.stringify(errors)]);
    }

    const {code , name , description} = parsedData.data;

    const updatedLanguageDetails = await prisma.language.update({
        where:{
            id: languageId
        },
        data:{
            code: code,
            name: name,
            description: description
        }
    })

    if(!updatedLanguageDetails){
        throw new ApiError(500,"Failed to Update Language Details")
    }

    return updatedLanguageDetails

}

export const deleteLanguage = async ( languageId : string ) => {

    const deletedLanguage = await prisma.language.delete({
        where:{
            id: languageId
        }
    })

    if(!deletedLanguage){
        throw new ApiError(500,"Failed to Delete Language")
    }

    return deletedLanguage
    
}
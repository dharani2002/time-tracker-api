import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { db } from "../db/index.js";
import { ApiResponse } from "../utils/apiResponse.js";

interface ProjectNameAndDescription{
    name:string;
    description:string
}

const createProjects=asyncHandler(async (req:Request,res:Response) => {
    const { name, description }: ProjectNameAndDescription =req.body
    if(!name || !description){
        throw new ApiError({statusCode:400,message:"all fields are required"})
    } 
    const result =await db
        .insertInto("project")
        .values({
            name: name,
            description: description,
            created_at: new Date()
        } )
        .executeTakeFirst()
    //console.log({rr: result.insertId})
    if(!result){
        throw new ApiError({statusCode:400,message:"failed to create project."})
    }


    return res
    .status(200)
    .json(new ApiResponse<{ id: number }>({ statusCode: 200, 
        data: { 
            id: Number(result?.insertId),        
        },
        message:"project created successfully"}))
    //.json({id: Number(result.insertId)})

})

const getProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    // Type assertion since we know id is an integer in database
    const { id } = req.params as { id: string };

    const project = await db.selectFrom('project')
        .selectAll()
        .where('id', '=', parseInt(id))
        .executeTakeFirst();

    if (!project) {
        throw new ApiError({statusCode:400,message:"project not found"})
    }

    return res
    .status(200)
    .json(
        new ApiResponse({statusCode:200,data:project,message:"project details fetched succesfully"})
    )
});

// const updateProjectDetails = asyncHandler(async (req: Request, res: Response) => {
//     const { id } = req.params as { id: string };
//     const { name, description }: ProjectNameAndDescription = req.body;

//     if (!name?.trim()) {
//         throw new ApiError({ statusCode: 400, message: "Project name is required" });
//     }

//     const result = await db.updateTable('project')
//         .set({
//             name,
//             description,
//             //updated_at: new Date(),
//         })
//         .where('id', '=', parseInt(id, 10))
//         .execute();

//     if (result.numUpdatedRows === 0n) {
//         throw new ApiError({ statusCode: 404, message: "Project not found" });
//     }

//     const updatedProject = await db.selectFrom('project')
//         .selectAll()
//         .where('id', '=', parseInt(id, 10))
//         .executeTakeFirst();

//     return res.status(200).json({
//         success: true,
//         message: 'Project updated successfully',
//         data: updatedProject
//     });
// });

export { 
    createProjects,
    getProjectDetails
};

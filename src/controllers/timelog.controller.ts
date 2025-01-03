import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../db/index.js";
import { ApiResponse } from "../utils/apiResponse.js";

interface TimelogDetails{
    project_id:string;
    hours: string;
    description:string;
    entry_date: string;
}

const createTimelog = asyncHandler(async (req: Request, res: Response) => {
    const { project_id, hours, description, entry_date }: TimelogDetails = req.body

    if(!project_id || !hours || !entry_date){
        throw new ApiError({statusCode:400,message:"all fields are required"})
    }

    const project = await db.selectFrom('project')
        .selectAll()
        .where('id', '=', parseInt(project_id))
        .executeTakeFirst();

    if (!project) {
        throw new ApiError({ statusCode: 400, message: "project not found" })
    }

    const timelogEntry = await db
        .insertInto('timelog')
        .values({
            project_id:parseInt(project_id),
            hours:parseFloat(hours),
            description,
            entry_date: new Date(Date.parse(entry_date))
        })
        .executeTakeFirst();

        if(!Number(timelogEntry.insertId)){
            throw new ApiError({statusCode:400,message:"couldnt create timelog"})
        }

    return res
        .status(200)
        .json(new ApiResponse<{ id: number }>({
            statusCode: 200,
            data: {
                id: Number(timelogEntry?.insertId),
            },
            message: "project created successfully"
        }))

})

const getTimelogOfProject=asyncHandler(async (req:Request,res:Response) => {
    const {id}=req.params as {id:string}

    const project = await db.selectFrom('project')
        .selectAll()
        .where('id', '=', parseInt(id))
        .executeTakeFirst();

    if (!project) {
        throw new ApiError({ statusCode: 400, message: "project not found" })
    }

    const timelog = await db.selectFrom('timelog')
        .selectAll()
        .where('project_id', '=', parseInt(id))
        .execute();

    if (!timelog) {
        throw new ApiError({ statusCode: 400, message: "project not found" })
    }

    return res
        .status(200)
        .json(
            new ApiResponse({ statusCode: 200, data: timelog, message: "project details fetched succesfully" })
        )
    
})

const updateTimelog=asyncHandler(async (req:Request,res:Response) => {
    const { id } = req.params as { id: string }
    const { project_id, hours, description, entry_date }: TimelogDetails = req.body  

    if (!project_id || !hours || !entry_date) {
        throw new ApiError({ statusCode: 400, message: "all fields are required" })
    }
    const result = await db.updateTable('timelog')
        .set({
            hours:parseFloat(hours),
            description,
            entry_date:new Date(Date.parse(entry_date))
        })
        .where('id', '=', parseInt(id, 10))
        .executeTakeFirst();

    if (Number(result.numUpdatedRows) === 0) {
        throw new ApiError({ statusCode: 404, message: "timelogs not found" });
    }

    const updatedtimelog = await db.selectFrom('timelog')
        .selectAll()
        .where('id', '=', parseInt(id, 10))
        .executeTakeFirst();

    return res.status(200).json({
        success: true,
        message: 'timelog updated successfully',
        data: updatedtimelog
    });
})

const deleteTimelogs = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const deletedCount = await db.deleteFrom('timelog')
        .where('id', '=', parseInt(id, 10))
        .executeTakeFirst();

    //console.log({ dd: deletedCount.numDeletedRows })

    if (Number(deletedCount.numDeletedRows) === 0) {
        return res.status(404).json({ message: 'timelog not found' });
    }

    res.status(200).json({ message: 'timelog deleted successfully' });

})

const getTotalNumberOfHours= asyncHandler(async (req:Request,res:Response) => {
    const {id} =req.params as {id:string}
    const totalHours = await db
        .selectFrom('timelog')
        .select((eb) => [
            eb.fn.sum('hours').as('total_hours')
        ])
        .where('project_id', '=', parseInt(id))
        .executeTakeFirst()
    
    return res
        .status(200)
        .json(
            new ApiResponse({
                statusCode: 200,
                data: {
                    project_id: id,
                    total_hours: Number(totalHours?.total_hours || 0)  // Handle case when no hours logged
                },
                message: "Successfully fetched total hours"
            })
        );
    
})


export {
    createTimelog,
    getTimelogOfProject,
    updateTimelog,
    deleteTimelogs,
    getTotalNumberOfHours

}
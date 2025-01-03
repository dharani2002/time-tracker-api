import { Router } from "express";
import { createTimelog, deleteTimelogs, getTimelogOfProject, getTotalNumberOfHours, updateTimelog } from "../controllers/timelog.controller.js";


const timelogRouter =Router()

timelogRouter.route("/create").post(createTimelog)
timelogRouter.route("/:id").get(getTimelogOfProject)
timelogRouter.route("/update/:id").patch(updateTimelog)
timelogRouter.route("/delete/:id").delete(deleteTimelogs)
timelogRouter.route("/hours/:id").get(getTotalNumberOfHours)


export default timelogRouter
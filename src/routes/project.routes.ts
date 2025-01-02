import { Router } from "express";
import { createProjects, deleteProjectDetails, getProjectDetails, updateProjectDetails } from "../controllers/project.controller.js";

const projectRouter=Router()

projectRouter.route("/create").post(createProjects)
projectRouter.route("/:id").get(getProjectDetails)
projectRouter.route("/update/:id").patch(updateProjectDetails)
projectRouter.route("/delete/:id").delete(deleteProjectDetails)

export default projectRouter
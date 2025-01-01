import { Router } from "express";
import { createProjects, getProjectDetails } from "../controllers/project.controller.js";

const projectRouter=Router()

projectRouter.route("/create").post(createProjects)
projectRouter.route("/:id").get(getProjectDetails)

export default projectRouter
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

//import routes
import projectRouter from "./routes/project.routes.js";
import timelogRouter from "./routes/timelog.routes.js";

//routes decalaration
app.use("/api/v1/projects",projectRouter)
app.use("/api/v1/timelogs",timelogRouter)

export {app}
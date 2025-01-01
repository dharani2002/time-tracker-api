import dotenv from "dotenv"
import connectDb from "./db/index.js"
import {app} from "./app.js"
dotenv.config({
    path: "./.env"
})

connectDb()
.then(()=>{
    app.listen(process.env.EXPRESS_PORT|| 8000, ()=>{
        console.log(`Server is running at port: http://localhost:${process.env.EXPRESS_PORT}`);
    })   
})
.catch((err)=>{
    console.error("server couldnt connect to database",err)
})

//console.log(db);


import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
    path: "./.env"
})

app.listen(process.env.EXPRESS_PORT || 8000, () => {
    console.log(`Server is running at port: http://localhost:${process.env.EXPRESS_PORT}`);
}) 

// connectDb()
// .then(()=>{
//     app.listen(process.env.EXPRESS_PORT|| 8000, ()=>{
//         console.log(`Server is running at port: http://localhost:${process.env.EXPRESS_PORT}`);
//     })   
// })
// .catch((err)=>{
//     console.error("server couldnt connect to database",err)
// })


//console.log(db);


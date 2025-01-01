import {MysqlDialect, Kysely} from "kysely";
import { createPool } from "mysql2";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
import { Database } from "../models/schema.js";

dotenv.config({
    path: "./.env"
})


const connectDb=async ()=>{
    try {
        const dialect=new MysqlDialect ({
            pool:createPool({
                database:DB_NAME,
                host:process.env.DB_HOST,
                user:process.env.DB_USER,
                password:process.env.DB_PASSWORD,
            })
        })
    
        const db = new Kysely<Database>({
            dialect,
        })
        console.log("Database connected successfully")
        return db;
    } catch (error) {
        console.error("failed to connect to the databse",error)       
    }
}

export default connectDb
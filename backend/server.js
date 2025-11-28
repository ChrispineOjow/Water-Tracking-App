import {connectDB} from "./config/db.js";
import "dotenv/config";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import reportRouter from "./routes/report.routes.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Database connection
await connectDB();

//Configuring cors
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map(origin=>origin.trim())
    .filter(Boolean)
const corsOptions = {
    origin : (origin, callback)=>{
        if(allowedOrigins.includes(origin) || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed to access this backend'))
        }
    }
}

app.use(cors(corsOptions));

// Initialize Clerk middleware BEFORE routes
app.use(clerkMiddleware());

//End points
app.get("/", async(req, res)=>{
    res.send(`The Server is up and running`);
});

app.use('/api', reportRouter);
app.use('/api', userRouter);

//Listen to the PORT
app.listen(PORT,()=>{
    console.log(`The server is running in http://localhost:${PORT}`);
});
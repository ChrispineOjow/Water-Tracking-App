import {connectDB} from "./config/db.js";
import "dotenv/config";
import express from "express";
import reportRouter from "./routes/report.routes.js";
import userRouter from "./routes/user.route.js"



const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Database connection
await connectDB();


//End points
app.get("/", async(req, res)=>{
    res.send(`The Server is up and running`);
});


app.use('/api', reportRouter);
app.use('/api',userRouter);


//Listen to the PORT
app.listen(PORT,()=>{
    console.log(`The server is running in http://localhost:${PORT}`);
});


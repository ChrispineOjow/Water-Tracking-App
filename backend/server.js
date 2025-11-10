import connectDB from "./config/db.js";
import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json())

//Database connection
await connectDB();


//End points
app.get("/", async(req, res)=>{
    res.send(`The Server is up and running`);
});


//Listen to the PORT
app.listen(PORT,()=>{
    console.log(`The server is running in http://localhost:${PORT}`);
});


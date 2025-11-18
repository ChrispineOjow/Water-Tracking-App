import {connectDB} from "./config/db.js";
import "dotenv/config";
import express from "express";
import reportRouter from "./routes/report.routes.js";
import userRouter from "./routes/user.route.js";
import cors from "cors"



const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Database connection
await connectDB();

//Configuring cors
const allowedOrigins =[
    'http://localhost:5173'
];
const corsOptions = {
    origin : (origin, callback)=>{
        //Check if the request ing origin is in our list of allowed origins
        if(allowedOrigins.includes(origin) || !origin){
           //Allow acces
            callback(null,true);
        }else{
            //Block access
            callback(new Error('Not allowed to access this backend'))
        }
    }
}

app.use(cors(corsOptions));



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


import {connectDB} from "./config/db.js";
import "dotenv/config";
import express from "express";
import reportRouter from "./routes/report.routes.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
// import helmet from "helmet";



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

// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'","'unsafe-eval'", "https://*.clerk.com"],
//             styleSrc: ["'self'", "'unsafe-inline'", "https://*.clerk.com"],
//             connectSrc: ["'self'", "https://*.clerk.com"],
//             imgSrc: ["'self'","blob:" ,"https://*.clerk.com", "data:"],
//         },
//     },
// }));

app.use(cors(corsOptions));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        console.log(`\n📥 ${req.method} ${req.path}`);
        console.log('Headers:', {
            authorization: req.headers.authorization ? 'Bearer ***' : 'Missing',
            'content-type': req.headers['content-type']
        });
    }
    next();
});

//End points
app.get("/", async(req, res)=>{
    res.send(`The Server is up and running`);
});


app.use('/api', reportRouter);
app.use('/api',userRouter);

// Error handling middleware (must be after routes)
app.use((err, req, res, next) => {
    console.error('\n❌ Error occurred:');
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


//Listen to the PORT
app.listen(PORT,()=>{
    console.log(`The server is running in http://localhost:${PORT}`);
});


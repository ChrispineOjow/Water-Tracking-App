import {connectDB} from "./config/db.js";
import "dotenv/config";
import express from "express";
import reportRouter from "./routes/report.routes.js";
import {User } from "./models/User.model.js"; // Will remove this its just for testing the user by derectly inserting the user to the server.js file


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


//This is temporary and it will be removed after test
app.post('/api/test/create-user', async(req,res)=>{

    try{

        const testUser = new User({
            clerkId: 'test_clerk_123',
            name: 'Test User',
            email: 'test@example.com',
            location: {
                type: 'Point',
                coordinates: [36.8219, -1.2921] 
            },
            role: 'user'
        })

        const saved = await testUser.save();
        res.json({
            success:true,
            data:saved
        })

    }catch(error){

        res.status(500).json({error:error.message});

    }

})


app.use('/api', reportRouter);


//Listen to the PORT
app.listen(PORT,()=>{
    console.log(`The server is running in http://localhost:${PORT}`);
});


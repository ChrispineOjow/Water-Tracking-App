import User from "../models/User.model.js";


export const userRegistration = async(req, res)=>{
    try{

        const {clerkId, name, email, coordinates, role} = req.body
        if(!clerkId || !clerkId.trim()){
            return res.status(400).json({
                message:"The clerkId field cannot be empty"
            })
        };
        if(!name || !name.trim()){
            return res.status(400).json({
                message:"The name field cannot be left empty"
            })
        }

        const newUser = new User ({
            clerkId,
            name,
            email,
            location:{
                type:"Point",
                coordinates:coordinates
            },
            role
        })

        const savedUser = await newUser.save();

        res.status(200).json({
            message:"User Regestration completed",
            savedUser
        })


    }catch(error){

        console.error("Server Error");
        res.status(500).json({
            message:"Server Error",
            error:error.message
        })

    }
}

export const getUser = async (req, res)=>{
    try{

        const users = await User.find();
        res.status(200).json({
            users     
        })
    }catch(error){

        console.error("Server error", error);
        res.status(500).json({
            message:"Server Error",
            error:error.message
        })

    }
}
import {WaterReport} from "../models/WaterReport.model.js";
import {User} from "../models/User.model.js";

//Create a water report
export const createReport = async(req, res)=>{
    try{

        const {userId, coordinates, waterAvailable, waterClean, description} = req.body

        //Coordinate validation
        if(!coordinates || coordinates.length !== 2){
            return res.status(400).json({
                success: false,
                message: "Valid coordinates [longitude, latitude] are required"
            });
        };

        //Checking if the user exists
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        };

        //Report creation
        const newReport = new WaterReport({
            userId,
            location: {
                type:'Point',
                coordinates:coordinates
            },
            waterAvailable,
            waterClean,
            description: description || ''

        })

        const savedReport = await newReport.save();

        res.status(201).json({
            success:true,
            message:"Water report created successfully",
            data:savedReport
        });


    }catch(error){

        console.error("Error creating report", error);
        res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message
        });

    };
};

// Get water report
export const getAllReports = async (req, res)=>{
    
    try{
        const reports = await WaterReport.find().populate('userId','name email location').sort({timestamp:-1})

        res.status(200).json({
            success:true,
            count:reports.length,
            data:reports
        });

    }catch(error){

        console.error("Error fetching reports",error);
        res.status(500).json({
            success:false,
            message: "Server Error",
            error: error.message
        });
        
    };
};

// Get single report By Id
export const getReportById = async(req, res)=>{
    try{
        const {_id}=req.params;
        const report = await WaterReport.findById(_id).populate("userId","name email location");

        if(!report){
            return res.status(401).json({
                success:false,
                message: "The Report could Not be found"
            });
        }

        res.status(200).json({
            success:true,
            data:report
        });

    }catch(error){

        console.error("Error fetching report", error);
        res.status(500).json({
            success:false,
            message:"Server error",
            error: error.message

        });
    }

};
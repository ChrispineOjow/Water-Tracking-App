import WaterReport from "../models/WaterReport.model.js";
import User from "../models/User.model.js";

//Create a water report
export const createReport = async(req, res)=>{
    try{

        const {userId, location, waterAvailable, waterClean, description} = req.body
        const coordinates = location.coordinates

        //Coordinate validation
        if(!coordinates || !Array.isArray(coordinates) ||coordinates.length !== 2){
            return res.status(400).json({
                message: "Valid coordinates [longitude, latitude] are required"
            });
        };

        //Checking if the user exists
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
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
            message:"Water report created successfully",
            savedReport
        });


    }catch(error){

        console.error("Error creating report", error);
        res.status(500).json({
            message:"Server error",
            error:error.message
        });

    };
};


//Update water report
export const updateReport = async (req, res) => {
    try{

        const {_id} = req.params;
        const updatedReport = await WaterReport.findByIdAndUpdate(
            _id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        ).populate("userId", "name email location -_id");

        if(!updatedReport){
            res.status(404).json({
                message:"The report was not found"
            });
        }
        
        res.status(200).json({
            message:"Report successfully updated",
            data:updatedReport
        })

        
    }catch(error){

        console.error(`Server error ${error}`);
        return res.status(500).json({
            message:"Server error just occured",
            error:error.message
        });

    };
};

// Get water report
export const getAllReports = async (req, res)=>{
    
    try{
        const reports = await WaterReport.find().populate('userId','name email location').sort({timestamp:-1})

        res.status(200).json({
            count:reports.length,
            reports
        });

    }catch(error){

        console.error("Error fetching reports",error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
        
    };
};

// Get single report By Id
export const getReportById = async(req, res)=>{
    try{
        const {_id}=req.params;
        const report = await WaterReport.findById(_id).populate("userId","name email location -_id");

        if(!report){
            return res.status(401).json({
                message: "The Report could Not be found"
            });
        }

        res.status(200).json({report});

    }catch(error){

        console.error("Error fetching report", error);
        res.status(500).json({
            message:"Server error",
            error: error.message

        });
    }

};

export const deleteReport = async(req, res)=>{
    try{

        const {_id} = req.params;
        const deleteWaterReport = await WaterReport.findByIdAndDelete(_id);

        if(!deleteWaterReport){
            return res.status(404).json({
                message:"The Record could not be found"
            })
        }

        res.status(200).json({
            message:"Report deleted successfully"
        })

    }catch(error){

        console.error("Server error", error);
        return res.status(500).json({
            message:"Server error",
            error: error.message
        })

    }
}
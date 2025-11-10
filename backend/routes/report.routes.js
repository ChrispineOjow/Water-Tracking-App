import express from "express";
import{createReport, getAllReports, getReportById, updateReport, deleteReport} from "../controllers/Report.controller.js"

const reportRouter = express.Router();

//Create a new water report
reportRouter.post("/reports", createReport);

//Get all Reports
reportRouter.get("/reports", getAllReports);

//Get reports by Id
reportRouter.get("/reports/:_id", getReportById);

//Update the Water report
reportRouter.put("/reports/:_id", updateReport);

//Delete the Water report
reportRouter.delete("/reports/:_id", deleteReport);


export default reportRouter;
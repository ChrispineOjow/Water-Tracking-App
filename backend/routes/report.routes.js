import express from "express";
import{createReport, getAllReports, getReportById} from "../controllers/Report.controller.js"

const reportRouter = express.Router();

//Create a new water report
reportRouter.post("/reports", createReport);

//Get all Reports
reportRouter.get("/reports", getAllReports);

//Get reports by Id
reportRouter.get("/reports", getReportById);


export default reportRouter;
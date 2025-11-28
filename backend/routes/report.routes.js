import express from "express";
import{
    createReport, 
    getAllReports, 
    getReportById, 
    updateReport, 
    deleteReport} from "../controllers/Report.controller.js";
import { requireAuth } from "@clerk/express";
import { syncClerkUser } from "../middleware/clerk.middleware.js";
import { 
    validateReport, 
    validateMongoId, 
    handleValidation } from '../middleware/validate.middleware.js';

const reportRouter = express.Router();

//Create a new water report and get all the reports
reportRouter.route("/reports")
    .post(
        requireAuth(), 
        syncClerkUser, 
        validateReport,                             
        handleValidation,
        createReport)
    .get(getAllReports);

//Get reports, update and delete by Id 
reportRouter.route("/reports/:_id")
    .get(
        validateMongoId,
        handleValidation,
        getReportById)
    .put(
        requireAuth(),
        syncClerkUser,
        validateMongoId,
        validateReport,
        handleValidation,
        updateReport)//Update the Water report
    .delete(
        requireAuth(),
        syncClerkUser,
        validateMongoId,
        handleValidation,
        deleteReport);//Delete the Water report


export default reportRouter;
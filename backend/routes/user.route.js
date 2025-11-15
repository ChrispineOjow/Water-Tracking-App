import {userRegistration, getUser} from "../controllers/user.controller.js";
import express from "express";

const userRouter = express.Router();

//Create and get User
userRouter.route("/user")
    .post(userRegistration)// For user registration
    .get(getUser)//To get the users

export default userRouter;
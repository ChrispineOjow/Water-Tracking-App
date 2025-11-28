import { getAllUsers,getOrCreateUser, createOrSyncUser} from "../controllers/user.controller.js";
import express from "express";
import { requireAuth } from "@clerk/express";
import { syncClerkUser } from "../middleware/clerk.middleware.js";

const userRouter = express.Router();

//Get al users
userRouter.get("/users", getAllUsers);
// GET user by clerk id (only owner can access)
userRouter.get("/user/clerk/:clerkId", requireAuth(), syncClerkUser, getOrCreateUser);

// POST create/sync user
userRouter.post("/user", requireAuth(), syncClerkUser, createOrSyncUser);

export default userRouter;
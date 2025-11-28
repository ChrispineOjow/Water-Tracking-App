import User from "../models/User.model.js";
import { getAuth } from "@clerk/express";

//Get al lusers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    return res.status(200).json({ 
      message: "Users retrieved successfully",
      users 
    });
  } catch (err) {
    console.error("getAllUsers error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET by clerk id (only owner)
export const getOrCreateUser = async (req, res) => {
  try {
    // prefer req.userDB from sync middleware
    if (req.userDB) return res.status(200).json({ user: req.userDB });

    // fallback: extract userId from token
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthenticated" });

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      // create minimal record
      user = await User.create({ clerkId: userId, name: req.body?.name || "", email: req.body?.email || "" });
      console.log("getOrCreateUser: created user", user._id);
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("getOrCreateUser error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};


// Create/ensure user (server-safe, uses clerk info if available)
export const createOrSyncUser = async (req, res) => {
  try {
    // prefer synced user if middleware ran
    if (req.userDB) return res.status(200).json(req.userDB);

    // fallback: accept clerkId in body but still require auth
    const { clerkId } = req.body;
    const { userId: authUserId } = getAuth(req) || {};
    if (!authUserId || authUserId !== clerkId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Upsert user record using clerk client could be done here as well
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: { clerkId, email: req.body.email || "", name: req.body.name || "" } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
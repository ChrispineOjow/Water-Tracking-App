import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/User.model.js";

export async function syncClerkUser(req, res, next) {
  try {
    const { userId } = getAuth(req);
    
    if (!userId) {
      console.log("syncClerkUser: no userId from auth");
      return next();
    }

    console.log("syncClerkUser: fetching Clerk user for", userId);

    // Fetch Clerk user profile
    const clerkUser = await clerkClient.users.getUser(userId);
    console.log("syncClerkUser: Clerk user fetched:", clerkUser.id);

    // Extract name and email from Clerk
    const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress || null;
    const fullName =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      clerkUser.username ||
      "User";

    console.log("syncClerkUser: extracted name=", fullName, "email=", primaryEmail);

    // Upsert user into DB
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("syncClerkUser: creating new user");
      user = await User.create({
        clerkId: userId,
        email: primaryEmail,
        name: fullName,
        location: { type: "Point", coordinates: [0, 0] }
      });
      console.log("syncClerkUser: user created:", user._id);
    } else {
      console.log("syncClerkUser: user exists, syncing");
      // Update if Clerk data changed
      const needsUpdate =
        (primaryEmail && user.email !== primaryEmail) ||
        (fullName && user.name !== fullName);

      if (needsUpdate) {
        if (primaryEmail) user.email = primaryEmail;
        if (fullName) user.name = fullName;
        await user.save();
        console.log("syncClerkUser: user updated");
      }
    }

    // Attach to request for controllers
    req.clerkUser = clerkUser;
    req.userDB = user;
    return next();
  } catch (err) {
    console.error("syncClerkUser error:", err.message);
    return res.status(500).json({ message: "User sync failed", error: err.message });
  }
}
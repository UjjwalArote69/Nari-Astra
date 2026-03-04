import express from "express";
import {
  registerUser,
  getUserInfo,
  loginUser,
  googleLogin,
  changePassword,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Get user info
router.get("/:id", getUserInfo);

// Login or register using Google
router.post(
  "/google-login",
  googleLogin,
);

//Change password
router.put(
  "/change-password",
  protectRoute,
  changePassword,
);

export default router;

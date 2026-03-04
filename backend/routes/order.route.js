import express from "express";
import { placeOrder } from "../controllers/order.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Place a new order
router.post(
  "/checkout",
  protectRoute,
  placeOrder,
);

export default router;

import express from 'express';
import { getORderDetailsByOrderId } from '../controllers/order_details.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get order details by order ID
router.get('/:orderId', protectRoute,getORderDetailsByOrderId);

export default router;
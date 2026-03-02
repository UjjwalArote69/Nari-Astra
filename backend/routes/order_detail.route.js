import express from 'express';
import { getORderDetailsByOrderId } from '../controllers/order_details.controller.js';

const router = express.Router();

// Get order details by order ID
router.get('/:orderId', getORderDetailsByOrderId);

export default router;
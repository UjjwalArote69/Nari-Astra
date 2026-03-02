import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';

const router = express.Router();

// Place a new order
router.post('/checkout', placeOrder);

export default router;
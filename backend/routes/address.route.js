import express from 'express';
import { addUserAddress, getUserAddresses } from '../controllers/address.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply protectRoute to ensure req.user.id is populated and the user is authenticated

// Get all addresses for the logged-in user
router.get('/', protectRoute, getUserAddresses);

// Add a new address for the logged-in user
router.post('/', protectRoute, addUserAddress);

export default router;
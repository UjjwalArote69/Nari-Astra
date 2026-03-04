import express from 'express';
// Add deleteUserAddress to your imports
import { addUserAddress, getUserAddresses, deleteUserAddress } from '../controllers/address.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, getUserAddresses);
router.post('/', protectRoute, addUserAddress);

// ADD THIS: Route to delete an address
router.delete('/:id', protectRoute, deleteUserAddress);

export default router;
import express from 'express';
import { addUserAddress } from '../controllers/address.controller.js';

const router = express.Router();

// Add a new address for a user
router.post('/', addUserAddress);

export default router;
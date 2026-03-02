import express from 'express';
const router = express.Router();
import { getAllProducts, getPRoductById, createProduct } from '../controllers/product.controller.js';

router.get('/', getAllProducts);
router.get('/:id', getPRoductById);
router.post('/', createProduct);

export default router;
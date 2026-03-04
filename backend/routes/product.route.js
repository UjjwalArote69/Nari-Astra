import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct } from '../controllers/product.controller.js';

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
dotenv.config();
import productRoutes from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import addressRoute from './routes/address.route.js';
import orderRoute from './routes/order.route.js';
import orderDetailsRoute from './routes/order_detail.route.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());


const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 20 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
})

app.use('/api', generalLimiter);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoute);
app.use('/api/addresses', addressRoute);
app.use('/api/orders', orderRoute);
app.use('/api/order-details', orderDetailsRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})
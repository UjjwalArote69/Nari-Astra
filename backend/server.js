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
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

app.use('/api', generalLimiter);
app.use('/api/products', productRoutes);

// FIX: Put authLimiter BEFORE the userRoute so the block happens before the login attempt
app.use('/api/users', authLimiter, userRoute); 

app.use('/api/addresses', addressRoute);
app.use('/api/orders', orderRoute);
app.use('/api/order-details', orderDetailsRoute);

// FIX: Remove the '*' path. 
// 1. Handle 404 errors (Routes that do not exist)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Cannot find ${req.originalUrl} on this server`
    });
});

// 2. Global Error Handling Middleware
app.use((err, req, res, next) => {
    // Log the error internally for debugging
    console.error(`[ERROR] ${err.message}`);
    console.error(err.stack);

    // Determine the status code (default to 500 Internal Server Error)
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on the server";

    // Send the response
    res.status(statusCode).json({
        success: false,
        message: message,
        // SECURITY: Never leak stack traces to users in a production environment
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
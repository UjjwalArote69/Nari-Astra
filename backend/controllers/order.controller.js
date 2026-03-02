import db from '../config/db.js';

// Create a new order
export const placeOrder = async (req,res) => {
    // 1. Debugging: See what Express is actually receiving
    console.log("Content-Type Header:", req.headers['content-type']);
    console.log("Incoming Body:", req.body);

    // 2. Safety Check: Fallback to an empty object so the server doesn't crash
    const {user_id, product_id, qty, price_at_purchase} = req.body || {};

    if (!user_id || !product_id) {
        return res.status(400).json({ message: "Express did not read the JSON body. Check Postman settings!" });
    }

    const total_price = qty * price_at_purchase;
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_price, status) VALUES (?,?,?)',
            [user_id, total_price, 'pending'] 
        );

        // Fixed the typo here (insertId instead of inertId)
        const newOrderId = orderResult.insertId;

        await connection.query(
            'INSERT INTO order_details (order_id, product_id, qty, price_at_purchase) VALUES (?,?,?,?)',
            [newOrderId, product_id, qty, price_at_purchase]
        );

        await connection.commit();
        res.status(201).json({message: "Order placed successfully", orderId: newOrderId});

    } catch (error) {
        await connection.rollback();
        res.status(500).json({message: "Checkout failed, order cancelled", error: error.message});
    } finally {
        connection.release();
    }
}
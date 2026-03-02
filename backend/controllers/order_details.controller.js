import db from '../config/db.js';

// Get order details for a specific order
export const getORderDetailsByOrderId = async (req,res) => {
    const {orderId} = req.params;
    try {
        const query = `
            SELECT 
                od.id AS detail_id,
                od.order_id,
                od.qty,
                od.price_at_purchase,
                p.name AS product_name,
                p.description
            FROM order_details od
            JOIN products p ON od.product_id = p.id
            WHERE od.order_id = ?
        `;

        const [rows] = await db.query(query, [orderId]);
        if (rows.length === 0) {
            res.status(404).json({message: "Order details not found for this order"});  
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: "Error fetching order details", error: error.message});
    }
}
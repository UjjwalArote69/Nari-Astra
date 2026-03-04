import db from '../config/db.js';

// Create a new address
export const addUserAddress = async (req, res) => {
    // Extract user_id from the authenticated user token, NOT the request body
    const user_id = req.user.id; 
    const { street, city, state, zip } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO addresses (user_id, street, city, state, zip) VALUES (?, ?, ?, ?, ?)',
            [user_id, street, city, state, zip]
        );
        res.status(201).json({ message: "Address added successfully", addressId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error: error.message });
    }
}

// Get user addresses
export const getUserAddresses = async (req, res) => {
    // Extract user_id from the authenticated user token
    const user_id = req.user.id;
    
    try {
        const [addresses] = await db.query(
            'SELECT * FROM addresses WHERE user_id = ?',
            [user_id]
        );
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error: error.message });
    }
}

// Delete user address
export const deleteUserAddress = async (req, res) => {
    const user_id = req.user.id;
    const address_id = req.params.id;

    try {
        const [result] = await db.query(
            'DELETE FROM addresses WHERE id = ? AND user_id = ?',
            [address_id, user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Address not found or unauthorized to delete" });
        }

        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting address", error: error.message });
    }
}
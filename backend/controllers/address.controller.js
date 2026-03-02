import db from '../config/db.js';

// Create a new address
export const addUserAddress = async (req, res) => {
    const {user_id, street,city} = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO addresses (user_id , street, city) VALUES (?,?,?)',
            [user_id,street,city]
        );
        res.status(201).json({message: "Address added", addressId: result.insertId});
    } catch (error) {
        res.status(500).json({message:"Error adding address", error: error.message});
    }
}

//Get user addresses
export const getUserAddresses = async (req, res) => {
    // const 
}
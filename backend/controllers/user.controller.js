import db from '../config/db.js';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT tokens
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};



// Create a new user (Register)
export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 1. Insert the user into the database
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        // 2. Generate a token using the newly created user's ID
        const token = generateToken(result.insertId);

        // 3. Send back the token and the user's basic info (excluding the password)
        res.status(201).json({ 
            message: "User created and logged in successfully", 
            user: {
                id: result.insertId,
                name: name,
                email: email
            },
            token: token
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email is already registered" });
        }
        // Pass any other errors to the global error handler
        next(error);
    }
}


// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find the user by email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = users[0];

        // 2. VERIFICATION (This is the "decryption" step)
        // We compare the text 'password' with the 'user.password' hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // We use the same error message for security (don't tell them which one was wrong)
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user.id);

        // 3. Success! Remove the hash before sending user data back
        const { password: _, ...userData } = user;

        res.status(200).json({ 
            message: "Login successful", 
            user: userData,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
}

// Get user info (Profile)
export const getUserInfo = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
}


// Google Login/Register logic
export const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // 1. Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, sub: googleId } = ticket.getPayload();

        // 2. Check if user already exists in your DB
        let [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        let user;

        if (users.length === 0) {
            // 3. If user doesn't exist, create them (Register)
            // We use a dummy password or null since they login via Google
            const [result] = await db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, `GOOGLE_AUTH_${googleId}`] 
            );
            
            const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = newUser[0];
        } else {
            user = users[0];
        }

        const jwtToken = generateToken(user.id);

        // 4. Remove password before sending back
        const { password: _, ...userData } = user;

        res.status(200).json({
            message: "Google login successful",
            user: userData,
            token: jwtToken
        });

    } catch (error) {
        res.status(500).json({ message: "Google auth failed", error: error.message });
    }
};

// Change password using existing credentials
export const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    try {
        // 1. Find the user by email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = users[0];

        // 2. Verify existing password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        // 3. Hash the new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // 4. Update the database
        await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedNewPassword, user.id]
        );

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating password", error: error.message });
    }
}
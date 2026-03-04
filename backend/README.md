![Express](https://img.shields.io/badge/Express.js-5.2+-black?style=flat-square&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-v5.7+-00758F?style=flat-square&logo=mysql)
![Node](https://img.shields.io/badge/Node.js-v16+-green?style=flat-square&logo=nodejs)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

# 🔧 Nari-Astra Backend

> RESTful API server for the Nari-Astra e-commerce platform

Express.js backend server for the Nari-Astra e-commerce platform. This API handles user authentication, product management, orders, and address management with security features like JWT authentication and rate limiting.

---

## 📋 Overview

The backend is built with Node.js and Express, providing RESTful API endpoints for the frontend React application. It includes:
- 🔐 User authentication with JWT and Google OAuth
- 📦 Product catalog management
- 🛒 Order and order details handling
- 📍 User address management
- 🛡️ Rate limiting for security
- 🔒 CORS protection

---

## 🛠️ Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| **Node.js** | v16+ | JavaScript runtime |
| **Express.js** | v5.2+ | Web framework |
| **MySQL** | v5.7+ | Relational database |
| **jwt** | ^9.0.3 | Authentication |
| **bcrypt** | ^6.0.0 | Password hashing |
| **cors** | ^2.8.6 | Cross-origin requests |
| **rate-limit** | ^8.2.1 | Request throttling |
| **dotenv** | ^17.3.1 | Environment management |
| **nodemon** | ^3.1.14 | Development reload |

---

## 📦 Installation

### Prerequisites ⚙️

| Requirement | Version |
|-------------|---------|
| **Node.js** | v16 or higher |
| **MySQL** | v5.7 or higher |
| **npm/yarn** | Latest |

### Setup Steps 🚀

```bash
# 1️⃣ Navigate to backend
cd backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create MySQL database
mysql -u root -p
> CREATE DATABASE nari_astra;

# 4️⃣ Create .env file
cp .env.example .env
# Then edit .env with your credentials

# 5️⃣ Start development server
npm run dev
```

**✅ Server ready at:** `http://localhost:5000`

### Environment Setup 🔐

Create a `.env` file in the backend root directory:

```env
# Server
PORT=5000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=nari_astra
DB_PORT=3306

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Security
JWT_SECRET=your_super_secret_jwt_key

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173
```

---

## 📁 Project Structure

```
backend/
├── 🗂️  config/
│   └── db.js                     # Database connection
├── 🎯 controllers/
│   ├── user.controller.js        # User logic
│   ├── product.controller.js     # Product logic
│   ├── order.controller.js       # Order logic
│   ├── order_details.controller.js
│   └── address.controller.js     # Address logic
├── 🔒 middleware/
│   └── auth.middleware.js        # JWT verification
├── 🛣️  routes/
│   ├── user.route.js
│   ├── product.route.js
│   ├── order.route.js
│   ├── order_detail.route.js
│   └── address.route.js
├── 🚀 server.js                  # Main application file
├── .env                          # Environment variables (git ignored)
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### 👤 Authentication & Users

#### 📝 Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullName": "John Doe"
}
```
**Response (201):** ✅
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### 🔓 Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
**Response (200):** ✅ Returns JWT token

#### 🔐 Google OAuth Login
```http
POST /api/users/google
Content-Type: application/json

{
  "token": "google_id_token"
}
```

#### 👁️ Get User Profile
```http
GET /api/users/profile
Authorization: Bearer jwt_token
```

#### ✏️ Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "phone": "0987654321"
}
```

---

### 📦 Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Get all products | - |
| `GET` | `/api/products/:id` | Get product details | - |
| `POST` | `/api/products` | Create product | 🔑 Admin |
| `PUT` | `/api/products/:id` | Update product | 🔑 Admin |
| `DELETE` | `/api/products/:id` | Delete product | 🔑 Admin |

---

### 🛒 Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/orders` | Get user orders | 🔑 User |
| `POST` | `/api/orders` | Create order | 🔑 User |
| `GET` | `/api/orders/:id` | Get order details | 🔑 User |
| `PUT` | `/api/orders/:id` | Update order status | 🔑 Admin |

---

### 📍 Addresses

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/addresses` | Get all addresses | 🔑 User |
| `POST` | `/api/addresses` | Add new address | 🔑 User |
| `PUT` | `/api/addresses/:id` | Update address | 🔑 User |
| `DELETE` | `/api/addresses/:id` | Delete address | 🔑 User |

---

### 📋 Order Details

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/order-details/:orderId` | Get order items |

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(255),
  phone VARCHAR(20),
  profileImage VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  stock INT DEFAULT 0,
  image VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  totalAmount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Order Details Table
```sql
CREATE TABLE order_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

### Addresses Table
```sql
CREATE TABLE addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  zipCode VARCHAR(20),
  country VARCHAR(100),
  isDefault BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

## Security Features

### 1. Authentication
- JWT-based token authentication
- Refresh token support (can be implemented)
- Google OAuth 2.0 integration
- Secure password hashing with bcrypt

### 2. Rate Limiting
```javascript
General Limiter:
- 100 requests per 15 minutes per IP

Auth Limiter (on /api/users):
- 5 requests per 15 minutes per IP
```

### 3. CORS Protection
- Configured to accept requests from specified frontend URL
- Credentials support enabled

### 4. Input Validation
- Email validation on registration/login
- Password requirements enforcement
- Required field validation

### 5. Error Handling
- Consistent error response format
- Secure error messages (no stack traces in production)
- 404 handling for non-existent routes

## Middleware

### Auth Middleware (`auth.middleware.js`)
Protects routes that require authentication:
```javascript
import { verifyToken } from '../auth.middleware.js';

router.get('/profile', verifyToken, getProfile);
```

Validates JWT token and attaches user info to request:
```javascript
req.user = {
  id: decoded.id,
  email: decoded.email
}
```

## Environment Configuration

### Development
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=dev_secret_key_12345
```

### Production
Create a separate `.env.production`:
```env
NODE_ENV=production
PORT=5000
DB_HOST=production_db_host
DB_USER=prod_user
DB_PASSWORD=secure_prod_password
JWT_SECRET=very_secret_prod_key
FRONTEND_URL=https://yourdomain.com
```

## Available Scripts

```bash
# Development with hot reload
npm run dev

# Run tests (when configured)
npm test
```

## 📚 Dependencies

### Production 📦
| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^5.2.1 | Web framework |
| **cors** | ^2.8.6 | Cross-origin requests |
| **dotenv** | ^17.3.1 | Environment variables |
| **mysql2** | ^3.18.2 | Database driver |
| **jsonwebtoken** | ^9.0.3 | JWT auth |
| **bcrypt** | ^6.0.0 | Password hashing |
| **express-rate-limit** | ^8.2.1 | Rate limiting |
| **google-auth-library** | ^10.6.1 | Google OAuth |

### Development 🔨
| Package | Purpose |
|---------|---------|
| **nodemon** | Auto-reload |

---

## 🐛 Troubleshooting

### ❌ Database Connection Error
```
Error: connect ECONNREFUSED
```
**✅ Solution:**
- Ensure MySQL is running: `mysql.server start` (Mac) or `net start MySQL80` (Windows)
- Check host, user, password in `.env`
- Verify database name exists

### ❌ Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**✅ Solution (Windows PowerShell):**
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill the process
Stop-Process -Id <PID> -Force

# Or use different port
set PORT=5001 && npm run dev
```

### ❌ JWT Token Errors
```
Error: jwt must be provided
```
**✅ Solution:**
- Ensure `Authorization: Bearer <token>` header is sent
- Check token hasn't expired
- Verify `JWT_SECRET` matches

### ❌ CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**✅ Solution:**
- Update `FRONTEND_URL` in `.env` to match frontend domain
- Ensure backend server is running
- Check credentials setting in frontend requests

### ❌ Module Not Found
```
Error: Cannot find module 'express'
```
**✅ Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run tests (configure when needed) |

---

## 📖 Additional Resources

- [Backend Documentation](README.md)
- [Frontend Documentation](../frontend/README.md)
- [Main Project README](../README.md)
- [Express.js Docs](https://expressjs.com/)
- [MySQL Docs](https://dev.mysql.com/doc/)

---

<div align="center">

### 🔧 **Backend Documentation Complete** 🔧

Made with ❤️ for women's empowerment

**[← Back to Main README](../README.md)** • **[View Frontend →](../frontend/README.md)**

</div>
import db from "../config/db.js";


//1. GET ALL PRODUCTS
export const getAllProducts = async (
  req,
  res,
) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products",
    );
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error",
        error,
      });
  }
};

//2. GET A SINGLE PRODUCT
export const getPRoductById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if(rows.length === 0) return res.status(404).json({message:"Product not found"});
        res.status(200).json(rows[0]); 
    } catch(error) {
        res.status(500).json({message: "Server Error", error});
    }
}

//3. CREATE A PRODUCT
export const createProduct =  async (req, res) => {
    const {name, description, price, stock} = req.body;
    try {
        const [result] = await db.query('INSERT INTO products (name, description, price, stock) VALUES(?,?,?,?)',
            [name,description,price,stock]
        );
        res.status(201).json({message: "Product created", productId: result.insertId});
    } catch (error) {
        res.status(500).json({message: "Server Error", error});
    }
}
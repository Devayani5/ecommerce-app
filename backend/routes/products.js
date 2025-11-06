const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // import model correctly

// ✅ GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from DB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new product (optional: to add new items)
router.post('/', async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = new Product({ name, price, description, stock });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

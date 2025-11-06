const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const User = require('../models/User');

// get current user profile
router.get('/me', auth, async (req, res) => {
  const u = await User.findById(req.user._id).populate('cart.product');
  res.json(u);
});

// add to cart
router.post('/cart', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const user = await User.findById(req.user._id);
  const existing = user.cart.find(c => c.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity || 1;
  } else {
    user.cart.push({ product: productId, quantity: quantity || 1 });
  }
  await user.save();
  const populated = await User.findById(user._id).populate('cart.product');
  res.json(populated.cart);
});

// remove from cart
router.delete('/cart/:productId', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(c => c.product.toString() !== req.params.productId);
  await user.save();
  const populated = await User.findById(user._id).populate('cart.product');
  res.json(populated.cart);
});

module.exports = router;

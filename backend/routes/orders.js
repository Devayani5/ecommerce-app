const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

router.post('/checkout', auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (!user.cart.length) return res.status(400).json({ message: 'Cart empty' });

  const items = user.cart.map(ci => ({
    product: ci.product._id,
    quantity: ci.quantity,
    price: ci.product.price
  }));
  const total = items.reduce((s,it)=> s + it.price * it.quantity, 0);
  const order = await Order.create({ user: user._id, items, total });

  // reduce stock (best-effort)
  for (const ci of user.cart) {
    const p = await Product.findById(ci.product._id);
    if (p) {
      p.stock = Math.max(0, p.stock - ci.quantity);
      await p.save();
    }
  }

  user.cart = [];
  await user.save();
  res.json(order);
});

// get user's orders
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
});

module.exports = router;

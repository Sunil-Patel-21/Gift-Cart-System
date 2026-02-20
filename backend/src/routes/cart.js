const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart, updateQuantity } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update/:giftId', protect, updateQuantity);
router.delete('/remove/:giftId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

module.exports = router;

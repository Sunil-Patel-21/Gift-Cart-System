const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getWishlist, addToWishlist, removeFromWishlist, moveToCart } = require('../controllers/wishlistController');

router.get('/', protect, getWishlist);
router.post('/add', protect, addToWishlist);
router.delete('/:giftId', protect, removeFromWishlist);
router.post('/move-to-cart', protect, moveToCart);

module.exports = router;

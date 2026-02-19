const express = require('express');
const router = express.Router();
const { getAllGifts, getGift, createGift, updateGift, deleteGift } = require('../controllers/giftController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getAllGifts);
router.get('/:id', getGift);
router.post('/', protect, admin, createGift);
router.put('/:id', protect, admin, updateGift);
router.delete('/:id', protect, admin, deleteGift);

module.exports = router;

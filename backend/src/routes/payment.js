const express = require('express');
const router = express.Router();
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/process', protect, processPayment);
router.get('/status/:orderId', protect, getPaymentStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/auth');

// Admin analytics route - requires admin authentication
router.get('/analytics', protect, admin, getAnalytics);

module.exports = router;

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gift' }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);

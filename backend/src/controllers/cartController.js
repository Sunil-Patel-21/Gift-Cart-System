const Cart = require('../models/Cart');
const Gift = require('../models/Gift');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.gift');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalAmount: 0 });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { giftId, quantity } = req.body;
    
    const gift = await Gift.findById(giftId);
    if (!gift) {
      return res.status(404).json({ success: false, message: 'Gift not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalAmount: 0 });
    }

    const existingItem = cart.items.find(item => item.gift.toString() === giftId);
    
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      existingItem.price = gift.price;
    } else {
      cart.items.push({
        gift: giftId,
        quantity: quantity || 1,
        price: gift.price
      });
    }

    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.gift');
    
    res.status(200).json({ success: true, message: 'Item added to cart', data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:giftId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.gift.toString() !== req.params.giftId);
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.gift');
    res.status(200).json({ success: true, message: 'Item removed from cart', data: updatedCart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

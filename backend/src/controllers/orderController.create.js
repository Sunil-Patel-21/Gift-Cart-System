const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Gift = require('../models/Gift');

// @desc    Create order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.gift');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      gift: item.gift._id,
      name: item.gift.name,
      quantity: item.quantity,
      price: item.price
    }));

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: cart.totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD'
    });

    // Clear cart after order
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, courierName, trackingNumber, estimatedDelivery } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
      
      const statusMessages = {
        'confirmed': 'Your order has been confirmed',
        'processing': 'Your order is being processed',
        'shipped': 'Your order has been shipped',
        'out_for_delivery': 'Your order is out for delivery',
        'delivered': 'Your order has been delivered',
        'cancelled': 'Your order has been cancelled'
      };
      
      order.trackingInfo.statusHistory.push({
        status: orderStatus,
        message: statusMessages[orderStatus] || 'Order status updated',
        timestamp: new Date()
      });
      order.trackingInfo.status = orderStatus;
    }
    
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (courierName) order.trackingInfo.courierName = courierName;
    if (trackingNumber) order.trackingInfo.trackingNumber = trackingNumber;
    if (estimatedDelivery) order.trackingInfo.estimatedDelivery = estimatedDelivery;

    await order.save();
    res.status(200).json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

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

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: cart.totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      trackingInfo: {
        status: 'pending',
        estimatedDelivery,
        statusHistory: [{
          status: 'pending',
          message: 'Order placed successfully',
          timestamp: new Date()
        }]
      }
    });

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

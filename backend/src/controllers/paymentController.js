const Order = require('../models/Order');

// @desc    Process dummy payment
// @route   POST /api/payment/process
// @access  Private
exports.processPayment = async (req, res) => {
  try {
    const { orderId, cardNumber, expiryDate, cvv, cardHolderName } = req.body;

    // Step 1: Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Step 2: Verify order belongs to logged-in user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Step 3: Simulate payment validation
    if (!cardNumber || cardNumber.length < 16) {
      return res.status(400).json({ success: false, message: 'Invalid card number' });
    }

    // Step 4: Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 5: Update order status to Paid
    order.paymentStatus = 'completed';
    order.orderStatus = 'confirmed';
    await order.save();

    // Step 6: Return success response
    res.status(200).json({
      success: true,
      message: 'Payment successful',
      data: {
        orderId: order._id,
        transactionId: 'TXN' + Date.now(),
        amount: order.totalAmount,
        status: 'completed'
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get payment status
// @route   GET /api/payment/status/:orderId
// @access  Private
exports.getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        orderId: order._id,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        amount: order.totalAmount
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

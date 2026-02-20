const Order = require('../models/Order');
const Gift = require('../models/Gift');

// @desc    Get admin analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    // 1. Calculate total revenue from completed/paid orders
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // 2. Get total number of orders
    const totalOrders = await Order.countDocuments();

    // 3. Get top 5 selling gifts
    const topSellingGifts = await Order.aggregate([
      { $unwind: '$items' },
      { 
        $group: { 
          _id: '$items.gift', 
          name: { $first: '$items.name' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        } 
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 }
    ]);

    // 4. Get category-wise sales
    const categoryWiseSales = await Order.aggregate([
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'gifts',
          localField: 'items.gift',
          foreignField: '_id',
          as: 'giftDetails'
        }
      },
      { $unwind: '$giftDetails' },
      {
        $lookup: {
          from: 'categories',
          localField: 'giftDetails.category',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      { $unwind: '$categoryDetails' },
      {
        $group: {
          _id: '$categoryDetails._id',
          categoryName: { $first: '$categoryDetails.name' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);

    // 5. Get recent orders count by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        topSellingGifts,
        categoryWiseSales,
        ordersByStatus
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const Gift = require('../models/Gift');

// @desc    Get all gifts
// @route   GET /api/gifts
// @access  Public
exports.getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find().populate('category', 'name');
    res.status(200).json({ success: true, count: gifts.length, data: gifts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single gift
// @route   GET /api/gifts/:id
// @access  Public
exports.getGift = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id).populate('category', 'name');
    if (!gift) {
      return res.status(404).json({ success: false, message: 'Gift not found' });
    }
    res.status(200).json({ success: true, data: gift });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create gift
// @route   POST /api/gifts
// @access  Private/Admin
exports.createGift = async (req, res) => {
  try {
    const gift = await Gift.create(req.body);
    res.status(201).json({ success: true, message: 'Gift created successfully', data: gift });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update gift
// @route   PUT /api/gifts/:id
// @access  Private/Admin
exports.updateGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!gift) {
      return res.status(404).json({ success: false, message: 'Gift not found' });
    }
    res.status(200).json({ success: true, message: 'Gift updated successfully', data: gift });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete gift
// @route   DELETE /api/gifts/:id
// @access  Private/Admin
exports.deleteGift = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);
    if (!gift) {
      return res.status(404).json({ success: false, message: 'Gift not found' });
    }
    res.status(200).json({ success: true, message: 'Gift deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

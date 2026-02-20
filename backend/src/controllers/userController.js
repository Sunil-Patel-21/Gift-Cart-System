const User = require('../models/User');
const Address = require('../models/Address');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, profilePicture },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({ success: true, message: 'Profile updated', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }
    
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort('-isDefault');
    res.json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { label, street, city, state, zipCode, country, phone, isDefault } = req.body;
    
    if (isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }
    
    const address = await Address.create({
      user: req.user.id,
      label, street, city, state, zipCode, country, phone, isDefault
    });
    
    res.status(201).json({ success: true, message: 'Address added', data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { label, street, city, state, zipCode, country, phone, isDefault } = req.body;
    
    if (isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }
    
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { label, street, city, state, zipCode, country, phone, isDefault },
      { new: true, runValidators: true }
    );
    
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    
    res.json({ success: true, message: 'Address updated', data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    
    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

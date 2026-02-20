const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');

exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('gifts');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, gifts: [] });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { giftId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, gifts: [giftId] });
    } else {
      if (!wishlist.gifts.includes(giftId)) {
        wishlist.gifts.push(giftId);
        await wishlist.save();
      }
    }
    
    wishlist = await wishlist.populate('gifts');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.gifts = wishlist.gifts.filter(id => id.toString() !== req.params.giftId);
    await wishlist.save();
    await wishlist.populate('gifts');
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.moveToCart = async (req, res) => {
  try {
    const { giftId } = req.body;
    
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    
    const existingItem = cart.items.find(item => item.gift.toString() === giftId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ gift: giftId, quantity: 1 });
    }
    await cart.save();
    
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    wishlist.gifts = wishlist.gifts.filter(id => id.toString() !== giftId);
    await wishlist.save();
    
    res.json({ message: 'Moved to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

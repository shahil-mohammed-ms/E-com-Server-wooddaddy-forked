const Wishlist = require('../models/wishlist');

const getWishlist = async (req, res) => {
  const { userId,folderName } = req.params;

  try {
    // Find wishlist items with the provided userId and populate the product details
    const wishlistItems = await Wishlist.find({ userId,folderName }).populate('proId');

    res.json({ wishlistItems });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve wishlist items' });
  }
};

const addWishlistItem = async (req, res) => {
  const { userId, proId,folderName } = req.params;

  try {
    // Create a new wishlist item
    const newWishlistItem = await Wishlist.create({
      userId,
      proId,
      folderName
    });

    res.status(201).json({ message: 'Wishlist item added successfully', wishlistItem: newWishlistItem });
  } catch (error) {
    res.status(500).json({ error: 'Could not add wishlist item' });
  }
};

const removeWishlistItem = async (req, res) => {
  const { proId, userId,folderName } = req.params;

  try {
    // Find and remove the wishlist item by proId and userId
    const removedWishlistItem = await Wishlist.findOneAndRemove({ proId, userId,folderName });

    if (!removedWishlistItem) {
      return res.status(404).json({ error: 'Wishlist item with the specified proId not found' });
    }

    res.json({ message: 'Wishlist item removed successfully', removedWishlistItem });
  } catch (error) {
    res.status(500).json({ error: 'Could not remove wishlist item' });
  }
};

module.exports = {
  getWishlist,
  addWishlistItem,
  removeWishlistItem
};

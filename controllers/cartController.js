const Cart = require('../models/cart');

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find carts with the provided userId
    const carts = await Cart.find({ userId }).populate('proId');

    res.json({ carts });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve carts' });
  }
};


const addCart = async (req, res) => {
  const { userId, proId } = req.params;

  try {
    // Create a new cart entry
    const newCart = await Cart.create({
      userId: userId,
      proId: proId,
      
    });

    res.status(201).json({ message: 'Cart entry created successfully', cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'Could not create cart entry' });
  }
};

const removeCart = async (req, res) => {
  const { proId,userId } = req.params;

  try {
    // Find and remove the cart item by proId
    const removedCart = await Cart.findOneAndRemove({ proId,userId });

    if (!removedCart) {
      return res.status(404).json({ error: 'Cart item with the specified proId not found' });
    }

    res.json({ message: 'Cart item removed successfully', removedCart });
  } catch (error) {
    res.status(500).json({ error: 'Could not remove cart item' });
  }
};

const updateCart = async (req,res) => {



}

module.exports={

  getCart,
  addCart,
  removeCart,
  updateCart,

}

const Wishlist = require('../models/wishlist');
const Cart = require('../models/cart');
const { ObjectId } = require('mongoose').Types;

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find carts with the provided userId
   // const carts = await Cart.find({ userId }).populate('proId');

   try {
    const { userId } = req.params;
    const { page = 1, limit = 10, sortField, sortOrder,   } = req.query;

    // Construct the base query
    const query = {};


    // Category filter

    // Sorting
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }



    // Find wishlist items with the provided userId and populate the product details
    const CartItems = await Cart.find({ userId })
    .populate('proId')
    .collation({ locale: 'en' }) // Enable case-insensitive search
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

      //console.log('wishlistItems:', CartItems);
      const productsWithData = await Promise.all(CartItems.map(async (product) => {
      //  console.log('product:', product);
         
        const wishlistExists = await Wishlist.exists({ userId:new  ObjectId('664db80748eeadcd76759a55'), proId: product.proId._id });
        const cartExists = await Cart.exists({ userId:new  ObjectId('664db80748eeadcd76759a55'), proId: product.proId._id });
        const cartDetails = await Cart.find({ userId:new  ObjectId('664db80748eeadcd76759a55'), proId: product.proId._id });

        console.log('object',cartDetails)
  
        return {
           ...product.proId._doc,
          inWishlist: wishlistExists,
          inCart: cartExists,
          cartDetails

        };
      }));
      console.log('productsWithData :', productsWithData);
      res.status(200).json({ products: productsWithData });

  } catch (error) {
    console.log('errrr',error)
    res.status(500).json({ error: 'Could not retrieve wishlist items' });
  }
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
      qty:1
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
    const removedCart = await Cart.findOneAndDelete({ proId,userId });

    if (!removedCart) {
      return res.status(404).json({ error: 'Cart item with the specified proId not found' });
    }

    res.json({ message: 'Cart item removed successfully', removedCart });
  } catch (error) {
    res.status(500).json({ error: 'Could not remove cart item' });
  }
};

const increasecartqty = async (req,res) => {

  try {
    const {cartId} = req.params;
    console.log('cartiddd',cartId)
    const cart = await Cart.findById(cartId);
    console.log('carrr',cart)
    if(!cart){
      return res.status(404).json({ message: 'cart not found' });

    }

    cart.qty += 1;
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);


  } catch (error) {
    console.log('errr',error)
    res.status(500).json({ message: 'Error incrementing cart quantity', error });

  }

}

const decreasecartqty = async (req,res) => {
  try {
    const {cartId} = req.params;
    const cart = await Cart.findById(cartId);
console.log('carrr',cart)
    if(!cart){
      return res.status(404).json({ message: 'cart not found' });

    }

    cart.qty -= 1;
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);


  } catch (error) {
    console.log('errr',error)
    res.status(500).json({ message: 'Error incrementing cart quantity', error });

  }
  
}

const updateCart = async (req,res) => {



}

module.exports={

  getCart,
  addCart,
  removeCart,
  updateCart,
  increasecartqty,
  decreasecartqty,

}

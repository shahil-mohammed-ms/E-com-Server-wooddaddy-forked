const Cart = require('../models/cart');

const getCart = async(req,res) =>{

const {userId} = req.params

//get carts with user id
const cart = await Cart.find({userId})

//get products details with the cart ids

}

const addCart = async (req,res) => {



}

const removeCart = async (req,res) => {



}

const updateCart = async (req,res) => {



}

module.exports={

  getCart,
  addCart,
  removeCart,
  updateCart,

}

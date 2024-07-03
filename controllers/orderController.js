const Order = require('../models/order');
const Address = require('../models/address');
const Cart = require('../models/cart');
const OrderItem = require('../models/orderItem');
const mongoose = require('mongoose');
const Product = require('../models/product')
const User = require('../models/user')

 
const createOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
const {products,totalAmt } = req.body
console.log('create order',products)
console.log('totalAmt',totalAmt)
    // Validate the address
    const addressExists = await Address.findById(addressId);
    if (!addressExists) {
      return res.status(404).json({ message: 'Address not found' });
    }
 
    

    const newOrder = new Order({
      userId,
      payment_mode: 'COD',
      Totalamount:totalAmt.totalPrice,
      address: addressId,
      products,
      status: 'Placed',
      offer: req.body.offer || "None"
    });
  
    const savedOrder = await newOrder.save();

    for (const item of products.item) {
      const product = await Product.findById(item.product_id);
      if (product) {
        product.stock -= item.qty;
        await product.save();
      }
    }

    const removedCart = await Cart.deleteMany({ userId }); 


    res.status(201).json(savedOrder);
  } catch (error) {
    console.log('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// get orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: 'userId',
        model: User,
        select: 'firstName lastName mail phone address'
      })
      .populate({
        path: 'products.item.product_id',
        model: Product,
        select: 'name price'
      })
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.log('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};


// Get order items by productId and userId
const getOrderItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const orderItems = await OrderItem.find({ userId, ordered: false }).populate('productId');

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ message: 'Order items not found' });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order items', error });
  }
};


 
//get order by id 
const getOrderById= async (req, res) => {
  try {
    const { orderId } = req.params;
    // Find the order item by its ID and delete it
    const OrderedDetails = await Order.findById(orderId)
    .populate({
      path: 'userId',
      model: User,
      select: 'firstName lastName mail phone address'
    })
    .populate({
      path: 'products.item.product_id',
      model: Product,
      select: 'name price'
    })
    .exec();;

    if (!OrderedDetails) {
      
      return res.status(404).json({ message: 'Order  not found' });
    }

    res.status(200).json({ message: 'Order found successfully',data:OrderedDetails });
  } catch (error) {
    console.log('err',error)
    res.status(500).json({ message: 'Error deleting order item', error });
  }
};
 
// Delete Order Item
const deleteOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    // Find the order item by its ID and delete it
    const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);

    if (!deletedOrderItem) {
      
      return res.status(404).json({ message: 'Order item not found' });
    }

    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.log('err',error)
    res.status(500).json({ message: 'Error deleting order item', error });
  }
};



module.exports = {
  createOrder,
  getOrderItems,
  deleteOrderItem,
  getAllOrders,
  getOrderById,
  
};

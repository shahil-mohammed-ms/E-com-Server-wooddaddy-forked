const Order = require('../models/order');
const Address = require('../models/address');

const OrderItem = require('../models/orderItem');
const mongoose = require('mongoose');
const Product = require('../models/product')

// Create a new order
// const createOrder = async (req, res) => {
//   console.log('req .body ',req.body)
//   try {
//     const { userId,addressId } = req.params
//     const {  Totalamount, products } = req.body;
//     console.log('req.cartdetails ',req.body[0].cartDetails)
//     // Validate the address
//     const addressExists = await Address.findById(addressId);
//     if (!addressExists) {
//       return res.status(404).json({ message: 'Address not found' });
//     }

//      let totalPrice = 0;
//     for (const item of req.body) {
//       const product = await Product.findById(item._id);
//       console.log('ppppp',product)
//       if (!product) {
//         return res.status(404).json({ message: `Product with id ${item.product_id} not found` });
//       }
//        item.price = product.sale_rate;
//       totalPrice += item.qty * product.sale_rate;
//     }

//      const newOrder = new Order({
//       userId,
//       payment_mode:'COD',
//       Totalamount,
//       address:addressId,
//       products: {
//         item: products.item,
//         totalPrice
//       },
//       status: 'Placed',
//       offer: req.body.offer || "None"
//     });

//      const savedOrder = await newOrder.save();

//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.log('Error creating order:', error);
//     res.status(500).json({ message: 'Error creating order', error });
//   }
// };
const createOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
const {products } = req.body
    // Validate the address
    const addressExists = await Address.findById(addressId);
    if (!addressExists) {
      return res.status(404).json({ message: 'Address not found' });
    }

    let totalPrice = 0;
    const items = [];
    // for (const item of req.body) {
    //   const product = await Product.findById(item._id);
    //   if (!product) {
    //     return res.status(404).json({ message: `Product with id ${item._id} not found` });
    //   }
    //   items.push({
    //     product_id: product._id,
    //     qty: item.qty,
    //     price: product.sale_rate
    //   });
    //   totalPrice += item.qty * product.sale_rate;
    // }

    const newOrder = new Order({
      userId,
      payment_mode: 'COD',
      Totalamount:10,
      address: addressId,
      products,
      status: 'Placed',
      offer: req.body.offer || "None"
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

 

// Get order items by productId and userId
const getOrderItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find order items by userId, where ordered is false, and populate the product details
    const orderItems = await OrderItem.find({ userId, ordered: false }).populate('productId');

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ message: 'Order items not found' });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order items', error });
  }
};


 

 
// Delete Order Item
const deleteOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;
console.log('reached delt')
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

  
};

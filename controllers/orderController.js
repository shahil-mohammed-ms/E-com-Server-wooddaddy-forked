const Order = require('../models/order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { orderId, customer, items, totalAmount, status } = req.body;

    const newOrder = new Order({
      orderId,
      customer,
      items,
      totalAmount,
      status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Add an item to an order
const addItemToOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity, price } = req.body;

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.items.push({ productId, quantity, price });
    order.totalAmount += quantity * price;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to order', error });
  }
};

// Remove an item from an order
const removeItemFromOrder = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const itemIndex = order.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const [removedItem] = order.items.splice(itemIndex, 1);
    order.totalAmount -= removedItem.quantity * removedItem.price;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from order', error });
  }
};

module.exports = {
  createOrder,
  addItemToOrder,
  removeItemFromOrder
};

const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');



// Handle Buy Item (Create or Add Item to Order)
const handleBuyItem = async (req, res) => {
  try {
    const { customerId, productId, quantity, price, customer } = req.body;

    // Check for existing pending order for the customer
    let order = await Order.findOne({ 'customer._id': customerId, status: 'pending' });

    if (order) {
      // If pending order exists, add item to the existing order
      order.items.push({ productId, quantity, price });
      order.totalAmount += quantity * price;
    } else {
      // If no pending order exists, create a new order
      order = new Order({
        orderId: `ORD-${Date.now()}`, // Generate a unique order ID
        customer,
        items: [{ productId, quantity, price }],
        totalAmount: quantity * price,
        status: 'pending'
      });
    }

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error handling buy item', error });
  }
};




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

// Add an item to an order
const addItemToOrder = async (req, res) => {
  try {
    const { productId, userId, quantity, price } = req.params;

    // Find the order item by productId and userId
    const orderItem = await OrderItem.findOne({ productId, userId });
    if (!orderItem) {
      // If the order item does not exist, create a new one
      const newOrderItem = new OrderItem({
        userId,
        productId,
        quantity,
        price:price,
      });

      const savedOrderItem = await newOrderItem.save();
      console.log('OrderItem created')
      return res.status(201).json({ created: true, message: 'OrderItem created', orderItem: savedOrderItem });
    } else {
      // If the order item exists, update the quantity and total amount
      orderItem.quantity += quantity;
      orderItem.price = price; // Assuming price might change, else remove this line

      const updatedOrderItem = await orderItem.save();
      console.log('OrderItem updated')
      return res.status(200).json({ created: true, message: 'OrderItem updated', orderItem: updatedOrderItem });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to order', error });
  }
};

// Get order items by productId and userId
const getOrderItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find order items by userId and populate the product details
    const orderItems = await OrderItem.find({ userId }).populate('productId');

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ message: 'Order items not found' });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order items', error });
  }
};

const incrementOrderItemQuantity = async (req, res) => {
  try {
    const { orderItemId } = req.params;

   // const orderItem = await OrderItem.findOne({ orderItemId });
   const orderItem = await OrderItem.findById(orderItemId);
    console.log('oid',orderItem)
    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    orderItem.quantity += 1;
    const updatedOrderItem = await orderItem.save();

    res.status(200).json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing order item quantity', error });
  }
};

const decrementOrderItemQuantity = async (req, res) => {
  try {
    const { orderItemId } = req.params;

  //  const orderItem = await OrderItem.findOne({ orderItemId });
  const orderItem = await OrderItem.findById(orderItemId);
    console.log('oid',orderItem)

    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    if (orderItem.quantity > 1) {
      orderItem.quantity -= 1;
      const updatedOrderItem = await orderItem.save();
      return res.status(200).json(updatedOrderItem);
    } else {
      return res.status(400).json({ message: 'Quantity cannot be less than 1' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error decrementing order item quantity', error });
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
    res.status(500).json({ message: 'Error deleting order item', error });
  }
};



module.exports = {
  createOrder,
  addItemToOrder,
  removeItemFromOrder,
  getOrderItems,
  handleBuyItem,
  incrementOrderItemQuantity,
  decrementOrderItemQuantity,
  deleteOrderItem,

  
};

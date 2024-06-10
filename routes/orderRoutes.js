const { Router } = require('express');
const router = Router();
const {  createOrder, addItemToOrder, removeItemFromOrder,getOrderItems,incrementOrderItemQuantity,decrementOrderItemQuantity,
  deleteOrderItem,
 } = require('../controllers/orderController');

// router.post('/orders', createOrder);
router.post('/orderitem/:productId/:userId/:quantity/:price', addItemToOrder);
router.get('/orderitem/:userId', getOrderItems);
router.put('/orderitem/increment/:orderItemId', incrementOrderItemQuantity);
router.put('/orderitem/decrement/:orderItemId', decrementOrderItemQuantity);
router.delete('/orderitem/:orderItemId', deleteOrderItem);
router.delete('/orderitem/:orderId/items/:itemId', removeItemFromOrder);

module.exports = router;
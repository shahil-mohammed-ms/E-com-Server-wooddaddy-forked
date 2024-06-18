const { Router } = require('express');
const router = Router();
const {  createOrder,getOrderItems,deleteOrderItem,getAllOrders,getOrderById
 } = require('../controllers/orderController');

// router.post('/orders', createOrder);
router.post('/createorder/:userId/:addressId', createOrder);
router.get('/', getAllOrders);
router.get('/getorder/:orderId', getOrderById);
router.get('/orderitem/:userId', getOrderItems);
router.delete('/orderitem/:orderItemId', deleteOrderItem);
 
module.exports = router;
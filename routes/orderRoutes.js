const { Router } = require('express');
const router = Router();
const {  createOrder, addItemToOrder, removeItemFromOrder } = require('../controllers/orderController');

router.post('/orders', createOrder);
router.post('/orders/:orderId/items', addItemToOrder);
router.delete('/orders/:orderId/items/:itemId', removeItemFromOrder);

module.exports = router;
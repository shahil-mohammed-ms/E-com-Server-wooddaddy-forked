const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/address/:userId', addressController.createAddress);
router.put('/address/:addressId', addressController.updateAddress);
router.delete('/address/:addressId', addressController.deleteAddress);
router.get('/getaddress/:userId', addressController.getAddresses);
router.get('/address/:addressId', addressController.getAddressById);

module.exports = router;

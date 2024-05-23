const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCart,addCart } = require('../controllers/cartController');


router.get('/:userId', getCart);
router.post("/:userId", addCart);
router.delete('/:id', deleteAdvertisementById);
router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;

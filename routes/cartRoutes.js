const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCart,addCart,removeCart } = require('../controllers/cartController');


router.get('/:userId', getCart);
router.post("/:userId/:proId", addCart);
router.delete('/:userId/:proId', removeCart);
// router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;

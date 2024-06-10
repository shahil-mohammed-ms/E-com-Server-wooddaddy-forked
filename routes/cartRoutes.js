const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCart,addCart,removeCart,increasecartqty,decreasecartqty } = require('../controllers/cartController');


router.get('/:userId', getCart);
router.post("/:userId/:proId", addCart);
router.put("/increase/:cartId", increasecartqty);
router.put("/decrease/:cartId", decreasecartqty);

router.delete('/:userId/:proId', removeCart);
// router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;

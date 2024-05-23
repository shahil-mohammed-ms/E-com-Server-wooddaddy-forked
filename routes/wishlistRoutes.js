const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getWishlist,addWishlistItem,removeWishlistItem } = require('../controllers/wishlistController');


router.get('/:userId/:folderName', getWishlist);
router.post("/:userId/:proId/:folderName", addWishlistItem);
router.delete('/:userId/:proId/:folderName', removeWishlistItem);
// router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;

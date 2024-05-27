const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addProduct, getProducts, deleteProduct,getProduct } = require('../controllers/productController');
const { upload } = require('../middlewares/multer');

router.post('/', upload.array('images', 10), addProduct);
router.get('/', getProducts);
router.get('/:proId', getProduct);
router.delete('/:id', authorization, deleteProduct);
// router.get('/:id', findOneProduct);
// router.patch('/:id',authorization, updateProduct);

module.exports = router;

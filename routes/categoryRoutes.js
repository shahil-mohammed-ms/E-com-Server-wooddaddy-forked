const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCategory, addCategory, deleteCategory,getSelectedCategory } = require('../controllers/categoryController');
const { upload } = require('../middlewares/multer');

router.get('/', getCategory);
router.get('/selectedcategories',getSelectedCategory)
router.post("/", upload.single('image'), addCategory);
// router.patch("/:id",authorization, updateCategory);
router.delete("/", deleteCategory);

module.exports = router;

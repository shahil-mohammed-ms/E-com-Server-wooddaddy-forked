const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCategory, addCategory, deleteCategory } = require('../controllers/categoryController');
const { upload } = require('../middlewares/multer');

router.get('/', getCategory);
router.post("/", authorization, upload.single('image'), addCategory);
// router.patch("/:id",authorization, updateCategory);
router.delete("/", authorization, deleteCategory);

module.exports = router;

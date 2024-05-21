const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addContentSection,getContentSection } = require('../controllers/contentSectionController');


router.post('/' , addContentSection);
router.get('/', getContentSection);
// router.delete('/:id', authorization, deleteProduct);


module.exports = router;

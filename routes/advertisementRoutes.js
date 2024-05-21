const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getAdvertisement,addAdvertisement,getAdvertisementById,deleteAdvertisementById,updateAdvertisementById  } = require('../controllers/advertisementController');
const { upload } = require('../middlewares/multer');

router.get('/', getAdvertisement);
router.get('/:id', getAdvertisementById);
router.post("/", upload.single('advertisement'), addAdvertisement);
router.delete('/:id', deleteAdvertisementById);
router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;

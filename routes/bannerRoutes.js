const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getBanners,addBanner,getBannerById,deleteBannerById,updateBannerById  } = require('../controllers/bannerController');
const { upload } = require('../middlewares/multer');

router.get('/', getBanners);
router.get('/:id', getBannerById);
router.post("/", upload.single('banner'), addBanner);
router.delete('/:id', deleteBannerById);
router.put('/:id', upload.single('banner'), updateBannerById);

 

module.exports = router;

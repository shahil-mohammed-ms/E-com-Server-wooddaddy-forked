const express = require('express');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const contentSectionRoutes = require('./contentSectionRoutes');
const banner = require('./bannerRoutes');
const router = express.Router();

router.use('/v1/category', categoryRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/contentSection', contentSectionRoutes);
router.use('/v1/banner', banner);

module.exports = router;

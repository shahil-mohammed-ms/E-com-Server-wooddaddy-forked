const express = require('express');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const contentSectionRoutes = require('./contentSectionRoutes');
const bannerRoutes = require('./bannerRoutes');
const advertisementRoutes = require('./advertisementRoutes');
const authRoutes = require('./authRoutes');
const router = express.Router();

router.use('/v1/category', categoryRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/contentSection', contentSectionRoutes);
router.use('/v1/banner', bannerRoutes);
router.use('/v1/advertisement', advertisementRoutes);
router.use('/v1/auth', authRoutes);


module.exports = router;

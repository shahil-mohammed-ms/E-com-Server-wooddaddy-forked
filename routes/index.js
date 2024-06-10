const express = require('express');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const contentSectionRoutes = require('./contentSectionRoutes');
const bannerRoutes = require('./bannerRoutes');
const advertisementRoutes = require('./advertisementRoutes');
const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const OrderRoutes = require('./orderRoutes');
const addressRoutes = require('./addressRoutes')

const router = express.Router();

router.use('/v1/category', categoryRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/contentSection', contentSectionRoutes);
router.use('/v1/banner', bannerRoutes);
router.use('/v1/advertisement', advertisementRoutes);
router.use('/v1/auth', authRoutes);
router.use('/v1/cart', cartRoutes);
router.use('/v1/wishlist', wishlistRoutes);
router.use('/v1/order', OrderRoutes);
router.use('/v1/address', addressRoutes);




module.exports = router;

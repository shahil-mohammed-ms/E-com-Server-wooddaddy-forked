const express = require('express');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const router = express.Router();

router.use('/v1/category', categoryRoutes);
router.use('/v1/products', productRoutes);

module.exports = router;

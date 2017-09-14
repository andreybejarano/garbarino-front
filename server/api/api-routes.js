const express = require('express');
const router = express.Router();
const ProductsController = require('./products/products-controller');
const CategoriesController = require('./categories/categories-controller');
const BrandsController = require('./brands/brands-controller');

router.get('/products', ProductsController.getProducts);
router.get('/categories', CategoriesController.getCategories);
router.get('/brands', BrandsController.getBrands);

module.exports = router;

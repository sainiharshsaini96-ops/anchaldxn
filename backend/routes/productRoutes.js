const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');

// Routes for Collection
router
  .route('/')
  .get(getProducts)
  .post(validateProduct, createProduct);

// Routes for Individual Resource by ID or Slug
router
  .route('/:id')
  .get(getProductById)
  .put(validateProduct, updateProduct)
  .delete(deleteProduct);

module.exports = router;

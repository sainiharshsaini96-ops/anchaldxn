const express = require('express');
const router = express.Router();
const {
  getIngredients,
  getIngredientBySlug,
} = require('../controllers/ingredientController');

router.route('/').get(getIngredients);
router.route('/:slug').get(getIngredientBySlug);

module.exports = router;

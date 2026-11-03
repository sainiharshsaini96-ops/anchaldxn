const { getCollection } = require('../config/db');
const Ingredient = require('../models/Ingredient');
const { ingredients: defaultIngredients } = require('../seed/seedData');
const mongoose = require('mongoose');

// @desc    Get all botanical ingredients
// @route   GET /api/ingredients
// @access  Public
exports.getIngredients = async (req, res) => {
  try {
    const { category, search } = req.query;

    // 1. Try Native MongoDB Atlas driver collection
    const collection = getCollection('ingredients');
    if (collection) {
      const filter = {};
      if (category && category !== 'all') {
        filter.category = category;
      }
      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [
          { botanicalName: regex },
          { commonName: regex },
          { overview: regex },
          { biochemicalComponents: regex },
        ];
      }

      const items = await collection.find(filter).sort({ botanicalName: 1 }).toArray();
      if (items && items.length > 0) {
        return res.json({
          success: true,
          count: items.length,
          data: items,
          source: 'mongodb-atlas',
        });
      }
    }

    // 2. Try Mongoose if connected
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const filter = {};
      if (category && category !== 'all') {
        filter.category = category;
      }
      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [
          { botanicalName: regex },
          { commonName: regex },
          { overview: regex },
          { biochemicalComponents: regex },
        ];
      }

      const ingredients = await Ingredient.find(filter).sort({ botanicalName: 1 });
      if (ingredients && ingredients.length > 0) {
        return res.json({
          success: true,
          count: ingredients.length,
          data: ingredients,
          source: 'mongodb-mongoose',
        });
      }
    }

    // 3. Resilient In-Memory Archive Fallback
    let result = [...defaultIngredients];

    if (category && category !== 'all') {
      result = result.filter((i) => i.category === category);
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.botanicalName.toLowerCase().includes(s) ||
          i.commonName.toLowerCase().includes(s) ||
          i.overview.toLowerCase().includes(s) ||
          (i.biochemicalComponents &&
            i.biochemicalComponents.some((comp) => comp.toLowerCase().includes(s)))
      );
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in getIngredients:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single ingredient by slug
// @route   GET /api/ingredients/:slug
// @access  Public
exports.getIngredientBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Try Native MongoDB Atlas driver collection
    const collection = getCollection('ingredients');
    if (collection) {
      const item = await collection.findOne({
        $or: [{ slug }, { id: slug }],
      });
      if (item) {
        return res.json({ success: true, data: item, source: 'mongodb-atlas' });
      }
    }

    // 2. Try Mongoose
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      let ingredient = await Ingredient.findOne({ slug });
      if (!ingredient && mongoose.Types.ObjectId.isValid(slug)) {
        ingredient = await Ingredient.findById(slug);
      }
      if (ingredient) {
        return res.json({ success: true, data: ingredient, source: 'mongodb-mongoose' });
      }
    }

    // 3. Fallback to in-memory store
    const item = defaultIngredients.find((i) => i.slug === slug || i.slug.includes(slug));
    if (!item) {
      return res.status(404).json({ success: false, message: 'Botanical ingredient not found' });
    }

    res.json({ success: true, data: item, source: 'in-memory-archive' });
  } catch (error) {
    console.error('Error in getIngredientBySlug:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

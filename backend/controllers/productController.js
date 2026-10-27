const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/db');
const { products: defaultProducts } = require('../seed/seedData');

// Helper to query by ObjectId or slug
const buildIdentifierQuery = (identifier) => {
  if (ObjectId.isValid(identifier) && identifier.length === 24) {
    return {
      $or: [
        { _id: new ObjectId(identifier) },
        { slug: identifier },
        { id: identifier },
      ],
    };
  }
  return {
    $or: [{ slug: identifier }, { id: identifier }],
  };
};

// @desc    1. READ ALL Products (with search, filter, and sorting)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    const collection = getCollection('products');

    if (collection) {
      const filter = {};

      if (category && category !== 'all') {
        filter.category = category;
      }

      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [
          { name: regex },
          { subtitle: regex },
          { keyIngredients: regex },
          { shortDescription: regex },
          { ingredientsList: regex },
        ];
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'name-asc') {
        sortOptions = { name: 1 };
      } else if (sort === 'name-desc') {
        sortOptions = { name: -1 };
      } else if (sort === 'category') {
        sortOptions = { category: 1, name: 1 };
      }

      const products = await collection.find(filter).sort(sortOptions).toArray();

      if (products && products.length > 0) {
        return res.json({
          success: true,
          count: products.length,
          data: products,
          source: 'mongodb-atlas',
        });
      }
    }

    // In-memory fallback if Atlas collection is empty or offline
    let result = [...defaultProducts];

    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.subtitle.toLowerCase().includes(s) ||
          p.keyIngredients.toLowerCase().includes(s) ||
          p.shortDescription.toLowerCase().includes(s) ||
          p.ingredientsList.some((ing) => ing.toLowerCase().includes(s))
      );
    }

    if (sort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    }

    res.json({
      success: true,
      count: result.length,
      data: result,
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    2. READ Single Product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = getCollection('products');

    if (collection) {
      const product = await collection.findOne(buildIdentifierQuery(id));
      if (product) {
        return res.json({
          success: true,
          data: product,
          source: 'mongodb-atlas',
        });
      }
    }

    // Fallback to in-memory default list
    const product = defaultProducts.find((p) => p.slug === id || p.id === id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    3. ADD a New Product
// @route   POST /api/products
// @access  Public
exports.createProduct = async (req, res) => {
  try {
    const collection = getCollection('products');
    const newProduct = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (collection) {
      // Check if product with slug already exists
      const existing = await collection.findOne({ slug: newProduct.slug });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Product with slug "${newProduct.slug}" already exists.`,
        });
      }

      const result = await collection.insertOne(newProduct);
      newProduct._id = result.insertedId;

      return res.status(201).json({
        success: true,
        message: 'Product added successfully to MongoDB Atlas.',
        data: newProduct,
        source: 'mongodb-atlas',
      });
    }

    // In-memory fallback
    defaultProducts.unshift(newProduct);
    res.status(201).json({
      success: true,
      message: 'Product added to in-memory archive.',
      data: newProduct,
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    4. UPDATE a Product by ID or Slug
// @route   PUT /api/products/:id
// @access  Public
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = getCollection('products');

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };
    delete updateData._id; // prevent immutable field error

    if (collection) {
      const query = buildIdentifierQuery(id);
      const updateResult = await collection.findOneAndUpdate(
        query,
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (updateResult) {
        return res.json({
          success: true,
          message: 'Product updated successfully in MongoDB Atlas.',
          data: updateResult,
          source: 'mongodb-atlas',
        });
      }
    }

    // In-memory fallback
    const idx = defaultProducts.findIndex((p) => p.slug === id || p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Product not found to update.' });
    }

    defaultProducts[idx] = {
      ...defaultProducts[idx],
      ...updateData,
    };

    res.json({
      success: true,
      message: 'Product updated in in-memory archive.',
      data: defaultProducts[idx],
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    5. DELETE a Product by ID or Slug
// @route   DELETE /api/products/:id
// @access  Public
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = getCollection('products');

    if (collection) {
      const query = buildIdentifierQuery(id);
      const deleteResult = await collection.deleteOne(query);

      if (deleteResult.deletedCount > 0) {
        return res.json({
          success: true,
          message: 'Product deleted successfully from MongoDB Atlas.',
          deletedCount: deleteResult.deletedCount,
          source: 'mongodb-atlas',
        });
      }
    }

    // In-memory fallback
    const idx = defaultProducts.findIndex((p) => p.slug === id || p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Product not found to delete.' });
    }

    const removed = defaultProducts.splice(idx, 1);
    res.json({
      success: true,
      message: 'Product deleted from in-memory archive.',
      data: removed[0],
      source: 'in-memory-archive',
    });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const validateProduct = (req, res, next) => {
  const { name, category, shortDescription } = req.body;

  // On POST (creation), name, category, shortDescription are required
  if (req.method === 'POST') {
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Product name is required and must be a valid text string.',
      });
    }

    if (!category || typeof category !== 'string' || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category is required (e.g., dietary-supplements, beverages, oral-care, personal-care).',
      });
    }

    if (!shortDescription || typeof shortDescription !== 'string' || !shortDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Short description is required.',
      });
    }
  }

  // Auto-generate slug if not provided
  if (name && !req.body.slug) {
    req.body.slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  next();
};

module.exports = validateProduct;

const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    botanicalName: {
      type: String,
      required: true,
      trim: true,
    },
    commonName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['botanicals', 'algae', 'beverage', 'personal'],
    },
    categoryLabel: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: '',
    },
    harvestStage: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: '',
    },
    overview: {
      type: String,
      required: true,
    },
    biochemicalComponents: [
      {
        type: String,
      },
    ],
    featuredProducts: [
      {
        productSlug: String,
        name: String,
        note: String,
      },
    ],
    precaution: {
      type: String,
      default: '',
    },
    purityIndex: {
      type: String,
      default: 'Laboratory Monitored',
    },
    translations: {
      hi: {
        botanicalName: String,
        commonName: String,
        overview: String,
        precaution: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);

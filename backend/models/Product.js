const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
      enum: ['dietary-supplements', 'beverages', 'oral-care', 'personal-care'],
    },
    categoryLabel: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: '',
    },
    verifiedArchive: {
      type: Boolean,
      default: true,
    },
    verifiedDate: {
      type: String,
      default: 'Oct 2024',
    },
    formFactor: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    secondaryImageUrl: {
      type: String,
      default: '',
    },
    imageAlt: {
      type: String,
      default: '',
    },
    keyIngredients: {
      type: String,
      default: '',
    },
    ingredientsList: [
      {
        type: String,
      },
    ],
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      default: '',
    },
    packSizes: [
      {
        type: String,
      },
    ],
    companionNotes: {
      type: String,
      default: '',
    },
    directions: {
      type: String,
      default: '',
    },
    storage: {
      type: String,
      default: 'Store in a cool, dry place away from direct sunlight.',
    },
    caution: {
      type: String,
      default: '',
    },
    bioactiveMarkers: [
      {
        type: String,
      },
    ],
    matrixBreakdown: {
      rgVsGl: {
        type: Boolean,
        default: false,
      },
      comparisonData: [
        {
          parameter: String,
          rgDetail: String,
          glDetail: String,
        },
      ],
    },
    translations: {
      hi: {
        name: String,
        subtitle: String,
        badge: String,
        shortDescription: String,
        fullDescription: String,
        keyIngredients: String,
        directions: String,
        formFactor: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);

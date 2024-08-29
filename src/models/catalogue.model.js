// @ts-nocheck
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const colorSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: false },
});

const catalogueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    type: {
      type: String,
      required: false,
    },
    colors: {
      type: [colorSchema],
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    banners: {
      type: [String],
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    featureTexts: {
      type: [String],
      required: false,
      trim: true,
    },
    featureImages: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
catalogueSchema.plugin(toJSON);
catalogueSchema.plugin(paginate);
/**
 * @typedef Catalogue
 */
const Catalogue = mongoose.model('Catalogue', catalogueSchema);

module.exports = Catalogue;

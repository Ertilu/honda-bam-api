// @ts-nocheck
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { mainConnection } = require('./connection');

const colorSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  code2: { type: String, required: true },
  code3: { type: String, required: true },
  image: { type: String, required: false },
  type: { type: String, required: false },
});

const typeSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const featureSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
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
    downPayment: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: false,
    },
    types: {
      type: [typeSchema],
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
    features: {
      type: [featureSchema],
      required: true,
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
const Catalogue = mainConnection.model('Catalogue', catalogueSchema);

module.exports = Catalogue;

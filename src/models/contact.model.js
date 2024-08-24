// @ts-nocheck
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const promoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
promoSchema.plugin(toJSON);
promoSchema.plugin(paginate);
/**
 * @typedef Promo
 */
const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;
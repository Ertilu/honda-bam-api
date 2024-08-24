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
    image: {
      type: [String],
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
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

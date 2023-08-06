const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const inStockSchema = mongoose.Schema(
  {
    vendor: {
      type: String,
      required: true,
    },
    in: {
      type: Number,
      required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
inStockSchema.plugin(toJSON);
inStockSchema.plugin(paginate);
/**
 * @typedef InStock
 */
const InStock = mongoose.model('InStock', inStockSchema);

module.exports = InStock;

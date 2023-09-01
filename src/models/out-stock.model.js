const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const outStockSchema = mongoose.Schema(
  {
    vendor: {
      type: String,
      required: true,
    },
    out: {
      type: Number,
      required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
    },
    inventoryName: {
      type: String,
      ref: 'Inventory',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
outStockSchema.plugin(toJSON);
outStockSchema.plugin(paginate);
/**
 * @typedef OutStock
 */
const OutStock = mongoose.model('OutStock', outStockSchema);

module.exports = OutStock;

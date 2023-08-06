const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const inventorySchema = mongoose.Schema(
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
    in: {
      type: Number,
      required: true,
    },
    out: {
      type: Number,
      required: true,
    },
    remaining: {
      type: Number,
      required: true,
    },
    inStocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InStock' }],
    outStocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OutStock' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
inventorySchema.plugin(toJSON);
inventorySchema.plugin(paginate);
/**
 * @typedef Inventory
 */
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;

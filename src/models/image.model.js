// @ts-nocheck
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { imageConnection } = require('./connection');

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);
/**
 * @typedef Image
 */
const Image = imageConnection.model('Image', imageSchema);

module.exports = Image;

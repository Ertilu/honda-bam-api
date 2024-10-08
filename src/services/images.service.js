const httpStatus = require('http-status');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a image
 * @returns {Promise<Image>}
 */
const createImage = async (body) => {
  const newBody = {
    ...body,
  };
  return Image.create(newBody);
};

/**
 * Query for images
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 */
const queryImages = async (filter, options) => {
  const images = await Image.paginate(filter, options);
  return images;
};

/**
 * Get image by id
 * @param {Object} id
 * @returns {Promise<Image>}
 */
const getImageById = async (id) => {
  return Image.findById(id);
};

/**
 * Update Image by id
 * @param {Object} imageId
 * @param {Object} updateBody
 * @returns {Promise<Image>}
 */
const updateImageById = async (imageId, updateBody) => {
  const image = await getImageById(imageId);

  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }

  Object.assign(image, updateBody);

  await image.save();
  return image;
};

/**
 * Delete image by id
 * @param {Object} imageId
 * @returns {Promise<Image>}
 */
const deleteImageById = async (imageId) => {
  const image = await getImageById(imageId);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }
  await image.remove();
  return image;
};

module.exports = {
  createImage,
  queryImages,
  getImageById,
  updateImageById,
  deleteImageById,
};

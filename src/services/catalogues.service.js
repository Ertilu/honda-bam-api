const httpStatus = require('http-status');
const { Catalogue } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a invenvtory
 * @returns {Promise<Catalogue>}
 */
const createCatalogue = async (body) => {
  const newBody = {
    ...body,
  };
  return Catalogue.create(newBody);
};

/**
 * Query for inventories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 */
const queryCatalogues = async (filter, options) => {
  const inventories = await Catalogue.paginate(filter, options);
  return inventories;
};

/**
 * Get catalogue by id
 * @param {Object} id
 * @returns {Promise<Catalogue>}
 */
const getCatalogueById = async (id) => {
  return Catalogue.findById(id);
};

/**
 * Update Catalogue by id
 * @param {Object} catalogueId
 * @param {Object} updateBody
 * @returns {Promise<Catalogue>}
 */
const updateCatalogueById = async (catalogueId, updateBody) => {
  const catalogue = await getCatalogueById(catalogueId);

  const newBody = {
    ...updateBody,
  };

  if (!catalogue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Catalogue not found');
  }

  Object.assign(catalogue, newBody);

  await catalogue.save();
  return catalogue;
};

/**
 * Delete catalogue by id
 * @param {Object} catalogueId
 * @returns {Promise<Catalogue>}
 */
const deleteCatalogueById = async (catalogueId) => {
  const catalogue = await getCatalogueById(catalogueId);
  if (!catalogue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Catalogue not found');
  }
  await catalogue.remove();
  return catalogue;
};

module.exports = {
  createCatalogue,
  queryCatalogues,
  getCatalogueById,
  updateCatalogueById,
  deleteCatalogueById,
};

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
 * Get inventory by id
 * @param {Object} id
 * @returns {Promise<Catalogue>}
 */
const getCatalogueById = async (id) => {
  return Catalogue.findById(id);
};

/**
 * Update Catalogue by id
 * @param {Object} inventoryId
 * @param {Object} updateBody
 * @returns {Promise<Catalogue>}
 */
const updateCatalogueById = async (inventoryId, updateBody) => {
  const inventory = await getCatalogueById(inventoryId);

  const inStock = updateBody?.in + inventory?.in || inventory?.in;
  const out = updateBody?.out + inventory?.out || inventory?.out;
  const newBody = {
    ...updateBody,
    in: inStock,
    out,
    remaining: inStock - out,
  };

  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Catalogue not found');
  }

  Object.assign(inventory, newBody);

  if (updateBody.inStock) {
    inventory.inStocks.push(updateBody.inStock);
  }

  if (updateBody.outStock) {
    inventory.outStocks.push(updateBody.outStock);
  }

  await inventory.save();
  return inventory;
};

/**
 * Delete inventory by id
 * @param {Object} inventoryId
 * @returns {Promise<Catalogue>}
 */
const deleteCatalogueById = async (inventoryId) => {
  const inventory = await getCatalogueById(inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Catalogue not found');
  }
  await inventory.remove();
  return inventory;
};

module.exports = {
  createCatalogue,
  queryCatalogues,
  getCatalogueById,
  updateCatalogueById,
  deleteCatalogueById,
};

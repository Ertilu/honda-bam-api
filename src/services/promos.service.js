const httpStatus = require('http-status');
const { Promo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a invenvtory
 * @returns {Promise<Promo>}
 */
const createPromo = async (body) => {
  const newBody = {
    ...body,
  };
  return Promo.create(newBody);
};

/**
 * Query for promos
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 */
const queryPromos = async (filter, options) => {
  const promos = await Promo.paginate(filter, options);
  return promos;
};

/**
 * Get inventory by id
 * @param {Object} id
 * @returns {Promise<Promo>}
 */
const getPromoById = async (id) => {
  return Promo.findById(id);
};

/**
 * Update Promo by id
 * @param {Object} inventoryId
 * @param {Object} updateBody
 * @returns {Promise<Promo>}
 */
const updatePromoById = async (inventoryId, updateBody) => {
  const inventory = await getPromoById(inventoryId);

  const inStock = updateBody?.in + inventory?.in || inventory?.in;
  const out = updateBody?.out + inventory?.out || inventory?.out;
  const newBody = {
    ...updateBody,
    in: inStock,
    out,
    remaining: inStock - out,
  };

  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Promo not found');
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
 * @returns {Promise<Promo>}
 */
const deletePromoById = async (inventoryId) => {
  const inventory = await getPromoById(inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Promo not found');
  }
  await inventory.remove();
  return inventory;
};

module.exports = {
  createPromo,
  queryPromos,
  getPromoById,
  updatePromoById,
  deletePromoById,
};

const httpStatus = require('http-status');
const { Inventory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a invenvtory
 * @param {Object} userBody
 * @returns {Promise<Inventory>}
 */
const createInventory = async (inventoryBody) => {
  const inStock = inventoryBody?.in || 0;
  const out = inventoryBody?.out || 0;
  const newBody = {
    ...inventoryBody,
    out,
    in: inStock,
    remaining: inStock,
  };
  return Inventory.create(newBody);
};

/**
 * Query for inventories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInventories = async (filter, options) => {
  const inventories = await Inventory.paginate(filter, options);
  return inventories;
};

/**
 * Get inventory by id
 * @param {ObjectId} id
 * @returns {Promise<Inventory>}
 */
const getInventoryById = async (id) => {
  return Inventory.findById(id);
};

/**
 * Update Inventory by id
 * @param {ObjectId} inventoryId
 * @param {Object} updateBody
 * @returns {Promise<Inventory>}
 */
const updateInventoryById = async (inventoryId, updateBody) => {
  const inventory = await getInventoryById(inventoryId);

  const inStock = updateBody?.in + inventory?.in || inventory?.in;
  const out = updateBody?.out + inventory?.out || inventory?.out;
  const newBody = {
    ...updateBody,
    in: inStock,
    out,
    remaining: inStock - out,
  };

  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
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
 * @param {ObjectId} inventoryId
 * @returns {Promise<Inventory>}
 */
const deleteInventoryById = async (inventoryId) => {
  const inventory = await getInventoryById(inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  await inventory.remove();
  return inventory;
};

module.exports = {
  createInventory,
  queryInventories,
  getInventoryById,
  updateInventoryById,
  deleteInventoryById,
};

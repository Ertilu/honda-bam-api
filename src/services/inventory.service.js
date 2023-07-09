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
    remaining: inStock - out,
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
 * Get inventory by email
 * @param {string} email
 * @returns {Promise<Inventory>}
 */
const getInventoryByEmail = async (email) => {
  return Inventory.findOne({ email });
};

/**
 * Update Inventory by id
 * @param {ObjectId} inventoryId
 * @param {Object} updateBody
 * @returns {Promise<Inventory>}
 */
const updateInventoryById = async (inventoryId, updateBody) => {
  const inventory = await getInventoryById(inventoryId);

  const inStock = updateBody?.in || inventory?.in;
  const out = updateBody?.out || inventory?.out;
  const newBody = {
    ...updateBody,
    remaining: inStock - out,
  };

  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  if (updateBody.email && (await Inventory.isEmailTaken(updateBody.email, inventoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(inventory, newBody);
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
  getInventoryByEmail,
  updateInventoryById,
  deleteInventoryById,
};

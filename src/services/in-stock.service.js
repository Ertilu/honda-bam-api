const httpStatus = require('http-status');
const { InStock } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a instock
 * @param {Object} inStockBody
 * @returns {Promise<InStock>}
 */
const createInStock = async (body) => {
  const inStock = await InStock.create(body);
  return inStock.save();
};

/**
 * Query for instocks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInStocks = async (filter, options) => {
  const inStocks = await InStock.paginate(filter, options);
  return inStocks;
};

/**
 * Get instock by id
 * @param {ObjectId} id
 * @returns {Promise<InStock>}
 */
const getInStockById = async (id) => {
  return InStock.findById(id);
};

/**
 * Update InStock by id
 * @param {ObjectId} InStockId
 * @param {Object} updateBody
 * @returns {Promise<InStock>}
 */
const updateInStockById = async (id, updateBody) => {
  const inStock = await getInStockById(id);

  if (!inStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'In Stock Data not found');
  }
  Object.assign(inStock, updateBody);
  await inStock.save();
  return inStock;
};

/**
 * Delete InStock by id
 * @param {ObjectId} InStockId
 * @returns {Promise<InStock>}
 */
const deleteInStockById = async (id) => {
  const inStock = await getInStockById(id);
  if (!inStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'In Stock not found');
  }
  await inStock.remove();
  return inStock;
};

const deleteInStockByInventoryId = async (inventory) => {
  return InStock.deleteMany({ inventory });
};

const updateInStockByInventoryId = async (inventoryId, data = []) => {
  const updatedData = await InStock.updateMany({ inventory: inventoryId }, data);

  return updatedData;
};

module.exports = {
  createInStock,
  queryInStocks,
  getInStockById,
  updateInStockById,
  deleteInStockById,
  deleteInStockByInventoryId,
  updateInStockByInventoryId,
};

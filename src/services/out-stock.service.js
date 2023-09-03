const httpStatus = require('http-status');
const moment = require('moment');
const { OutStock } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a outstock
 * @param {Object} outStockBody
 * @returns {Promise<OutStock>}
 */
const createOutStock = async (body) => {
  return OutStock.create(body);
};

/**
 * Query for outstocks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOutStocks = async (filter, options) => {
  const outStocks = await OutStock.paginate(filter, options);
  return outStocks;
};

/**
 * Get outstock by id
 * @param {ObjectId} id
 * @returns {Promise<OutStock>}
 */
const getOutStockById = async (id) => {
  return OutStock.findById(id);
};

/**
 * Update OutStock by id
 * @param {ObjectId} OutStockId
 * @param {Object} updateBody
 * @returns {Promise<OutStock>}
 */
const updateOutStockById = async (id, updateBody) => {
  const outStock = await getOutStockById(id);

  if (!outStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Out Stock Data not found');
  }
  Object.assign(outStock, updateBody);
  await outStock.save();
  return outStock;
};

/**
 * Delete OutStock by id
 * @param {ObjectId} OutStockId
 * @returns {Promise<OutStock>}
 */
const deleteOutStockById = async (id) => {
  const outStock = await getOutStockById(id);
  if (!outStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Out Stock not found');
  }
  await outStock.remove();
  return outStock;
};

const deleteOutStockByInventoryId = async (inventory) => {
  return OutStock.deleteMany({ inventory });
};

const updateOutStockByInventoryId = async (inventoryId, data = []) => {
  const updatedData = await OutStock.updateMany({ inventory: inventoryId }, data);

  return updatedData;
};

const getOutStockByRangeDate = async ({ inventoryIds, filterStockYear, filterStockMonth } = {}) => {
  if (!inventoryIds) {
    return [];
  }
  const currentDate = new Date();
  const filterDate =
    filterStockYear && filterStockMonth
      ? [filterStockYear, filterStockMonth]
      : [currentDate.getFullYear(), currentDate.getMonth()];

  const outStocks = await OutStock.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment(filterDate).startOf('month').toDate(),
          $lt: moment(filterDate).endOf('month').toDate(),
        },
        inventory: { $in: inventoryIds },
      },
    },
    {
      $group: { _id: '$inventory', outStockCurrentMonth: { $sum: '$out' } },
    },
  ]);

  return outStocks;
};

module.exports = {
  createOutStock,
  queryOutStocks,
  getOutStockById,
  updateOutStockById,
  deleteOutStockById,
  deleteOutStockByInventoryId,
  updateOutStockByInventoryId,
  getOutStockByRangeDate,
};

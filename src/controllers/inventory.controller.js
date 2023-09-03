const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { inventoryService, inStockService, outStockService } = require('../services');
const { transformInventory } = require('./inventory.util');

const createInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.createInventory(req.body);
  res.status(httpStatus.CREATED).send(inventory);
});

const getInventories = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query?.search && req.query?.search !== '') {
    const { search } = req.query;
    // eslint-disable-next-line security/detect-non-literal-regexp
    const re = new RegExp(`${search}`, 'i');
    filter = {
      $or: [{ name: { $regex: re } }, { vendor: { $regex: re } }],
    };
  }
  const options = {
    ...pick(req.query, ['sortBy', 'limit', 'page']),
    populate: 'inStocks,outStocks',
  };
  const result = await inventoryService.queryInventories(filter, options);

  const inventoryIds = [];
  result.results?.forEach((item) => {
    inventoryIds.push(item._id);
  });
  const { filterStockMonth, filterStockYear } = pick(req.query, ['filterStockMonth', 'filterStockYear']);
  const inStockPerMonth = await inStockService.getInStockByRangeDate({ inventoryIds, filterStockYear, filterStockMonth });
  const outStockPerMonth = await outStockService.getOutStockByRangeDate({ inventoryIds, filterStockYear, filterStockMonth });

  res.send(transformInventory(result, inStockPerMonth, outStockPerMonth));
});

const getInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.getInventoryById(req.params.inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  res.send(inventory);
});

const updateInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.updateInventoryById(req.params.inventoryId, req.body);
  await inStockService.updateInStockByInventoryId(req.params.inventoryId, { inventoryName: req.body.name });
  await outStockService.updateOutStockByInventoryId(req.params.inventoryId, { inventoryName: req.body.name });

  res.send(inventory);
});

const deleteInventory = catchAsync(async (req, res) => {
  await inventoryService.deleteInventoryById(req.params.inventoryId);
  await inStockService.deleteInStockByInventoryId(req.params.inventoryId);
  await outStockService.deleteOutStockByInventoryId(req.params.inventoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInventory,
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
};

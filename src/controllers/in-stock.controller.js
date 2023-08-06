const mongoose = require('mongoose');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { inStockService, inventoryService } = require('../services');

const createInStock = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const inStock = await inStockService.createInStock({
      ...req.body,
      inventory: req.body.inventoryId,
      in: req.body.inStock,
    });

    await inventoryService.updateInventoryById(req.body.inventoryId, {
      in: req.body.inStock,
      inStock,
    });
    res.status(httpStatus.CREATED).send(inStock);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
});

const getInStocks = catchAsync(async (req, res) => {
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
    populate: 'inventory',
  };
  const result = await inStockService.queryInStocks(filter, options);
  res.send(result);
});

const getInStock = catchAsync(async (req, res) => {
  const inStock = await inStockService.getInStockById(req.params.inventoryId);
  if (!inStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'In Stock not found');
  }
  res.send(inStock);
});

const updateInStock = catchAsync(async (req, res) => {
  const inStock = await inStockService.updateInventoryById(req.params.inventoryId, req.body);
  res.send(inStock);
});

const deleteInStock = catchAsync(async (req, res) => {
  await inStockService.deleteInventoryById(req.params.inventoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInStock,
  getInStocks,
  getInStock,
  updateInStock,
  deleteInStock,
};

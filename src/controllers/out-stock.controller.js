const httpStatus = require('http-status');
const mongoose = require('mongoose');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { outStockService, inventoryService } = require('../services');

const createOutStock = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const outStock = await outStockService.createOutStock({
      ...req.body,
      inventory: req.body.inventoryId,
      out: req.body.out,
    });

    await inventoryService.updateInventoryById(req.body.inventoryId, {
      out: req.body.out,
      outStock,
    });
    res.status(httpStatus.CREATED).send(outStock);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
});

const getOutStocks = catchAsync(async (req, res) => {
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
  const result = await outStockService.queryOutStocks(filter, options);
  res.send(result);
});

const getOutStock = catchAsync(async (req, res) => {
  const outStock = await outStockService.getOutStockById(req.params.outStockId);
  if (!outStock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Out Stock not found');
  }
  res.send(outStock);
});

const updateOutStock = catchAsync(async (req, res) => {
  const outStock = await outStockService.updateOutStockById(req.params.outStockId, req.body);
  res.send(outStock);
});

const deleteOutStock = catchAsync(async (req, res) => {
  await outStockService.deleteOutStockById(req.params.outStockId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOutStock,
  getOutStocks,
  getOutStock,
  updateOutStock,
  deleteOutStock,
};

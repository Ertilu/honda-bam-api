const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { promosService } = require('../services');

const createPromo = catchAsync(async (req, res) => {
  const promos = await promosService.createPromo(req.body);
  res.status(httpStatus.CREATED).send(promos);
});

const getPromos = catchAsync(async (req, res) => {
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
  };
  const result = await promosService.queryPromos(filter, options);

  res.send(result);
});

const getPromo = catchAsync(async (req, res) => {
  const promos = await promosService.getPromoById(req.params.promosId);
  if (!promos) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Promos not found');
  }
  res.send(promos);
});

const updatePromos = catchAsync(async (req, res) => {
  const promos = await promosService.updatePromoById(req.params.promosId, req.body);

  res.send(promos);
});

const deletePromos = catchAsync(async (req, res) => {
  await promosService.deletePromoById(req.params.promosId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPromo,
  getPromos,
  getPromo,
  updatePromos,
  deletePromos,
};

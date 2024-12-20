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
  const start = new Date();

  const endOfTheDay = new Date();
  endOfTheDay.setUTCHours(23, 59, 59, 999);

  let filter = {
    startDate: {
      $lt: start,
    },
    endDate: {
      $gt: endOfTheDay,
    },
  };
  if (req.query?.search && req.query?.search !== '') {
    const { search } = req.query;
    // eslint-disable-next-line security/detect-non-literal-regexp
    const re = new RegExp(`${search}`, 'i');

    filter = {
      ...filter,
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
  const promos = await promosService.getPromoById(req.params.promoId);
  if (!promos) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Promos not found');
  }
  res.send(promos);
});

const updatePromos = catchAsync(async (req, res) => {
  const promos = await promosService.updatePromoById(req.params.promoId, req.body);

  res.send(promos);
});

const deletePromos = catchAsync(async (req, res) => {
  await promosService.deletePromoById(req.params.promoId);

  res.status(httpStatus.NO_CONTENT).send('success');
});

module.exports = {
  createPromo,
  getPromos,
  getPromo,
  updatePromos,
  deletePromos,
};

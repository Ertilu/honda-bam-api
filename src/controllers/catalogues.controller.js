const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cataloguesService } = require('../services');

const createCatalogue = catchAsync(async (req, res) => {
  const catalogues = await cataloguesService.createCatalogue(req.body);
  res.status(httpStatus.CREATED).send(catalogues);
});

const getCatalogues = catchAsync(async (req, res) => {
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
  const result = await cataloguesService.queryCatalogues(filter, options);

  res.send(result);
});

const getCatalogue = catchAsync(async (req, res) => {
  const catalogues = await cataloguesService.getCatalogueById(req.params.cataloguesId);
  if (!catalogues) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Catalogues not found');
  }
  res.send(catalogues);
});

const updateCatalogues = catchAsync(async (req, res) => {
  const catalogues = await cataloguesService.updateCatalogueById(req.params.cataloguesId, req.body);

  res.send(catalogues);
});

const deleteCatalogues = catchAsync(async (req, res) => {
  await cataloguesService.deleteCatalogueById(req.params.cataloguesId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCatalogue,
  getCatalogues,
  getCatalogue,
  updateCatalogues,
  deleteCatalogues,
};
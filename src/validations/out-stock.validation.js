const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOutStock = {
  body: Joi.object().keys({
    inventoryId: Joi.string().required(),
    vendor: Joi.string(),
    out: Joi.number().required(),
  }),
};

const getOutStocks = {
  query: Joi.object().keys({
    search: Joi.string().optional().allow(''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOutStock = {
  params: Joi.object().keys({
    outStockId: Joi.string().custom(objectId),
  }),
};

const updateOutStock = {
  params: Joi.object().keys({
    outStockId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      inventoryId: Joi.string().required(),
      vendor: Joi.string(),
      out: Joi.number().required(),
    })
    .min(1),
};

const deleteOutStock = {
  params: Joi.object().keys({
    outStockId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOutStock,
  getOutStock,
  getOutStocks,
  updateOutStock,
  deleteOutStock,
};

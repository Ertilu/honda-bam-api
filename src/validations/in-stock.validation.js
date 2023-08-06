const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInStock = {
  body: Joi.object().keys({
    inventoryId: Joi.string().required(),
    vendor: Joi.string(),
    inStock: Joi.number().required(),
  }),
};

const getInStocks = {
  query: Joi.object().keys({
    search: Joi.string().optional().allow(''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInStock = {
  params: Joi.object().keys({
    inStockId: Joi.string().custom(objectId),
  }),
};

const updateInStock = {
  params: Joi.object().keys({
    inStockId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      vendor: Joi.string().trim(),
      price: Joi.number(),
    })
    .min(1),
};

const deleteInStock = {
  params: Joi.object().keys({
    inStockId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInStock,
  getInStock,
  getInStocks,
  updateInStock,
  deleteInStock,
};

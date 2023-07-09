const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInventory = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    vendor: Joi.string().trim(),
    price: Joi.number(),
    in: Joi.number(),
    out: Joi.number(),
  }),
};

const getInventories = {
  query: Joi.object().keys({
    search: Joi.string().optional().allow(''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.string().custom(objectId),
  }),
};

const updateInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      vendor: Joi.string().trim(),
      price: Joi.number(),
      in: Joi.number(),
      out: Joi.number(),
    })
    .min(1),
};

const deleteInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInventory,
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
};

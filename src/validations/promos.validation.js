const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPromo = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    images: Joi.array().items(Joi.string()),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
  }),
};

const getPromos = {
  query: Joi.object().keys({
    search: Joi.string().optional().allow(''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPromo = {
  params: Joi.object().keys({
    PromoId: Joi.string().custom(objectId),
  }),
};

const updatePromo = {
  params: Joi.object().keys({
    PromoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      price: Joi.number(),
    })
    .min(1),
};

const deletePromo = {
  params: Joi.object().keys({
    PromoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPromo,
  getPromos,
  getPromo,
  updatePromo,
  deletePromo,
};

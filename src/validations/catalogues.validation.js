const Joi = require('joi');
const { objectId } = require('./custom.validation');

let color = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string().required(),
  code2: Joi.string(),
  code3: Joi.string(),
  image: Joi.string(),
  type: Joi.string(),
});

let type = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.string().required(),
});

let feature = Joi.object().keys({
  title: Joi.string().required(),
  text: Joi.string().required(),
  image: Joi.string().required(),
});

const cataloguePayload = {
  name: Joi.string().trim(),
  price: Joi.number(),
  downPayment: Joi.number(),
  description: Joi.string().trim(),
  category: Joi.string().required(),
  types: Joi.array().items(type),
  colors: Joi.array().items(color),
  logo: Joi.string().trim(),
  banners: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string()),
  features: Joi.array().items(feature),
};

const createCatalogue = {
  body: Joi.object().keys(cataloguePayload),
};

const getCatalogues = {
  query: Joi.object().keys({
    search: Joi.string().optional().allow(''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    category: Joi.string().optional(),
  }),
};

const getCatalogue = {
  params: Joi.object().keys({
    catalogueId: Joi.string().custom(objectId),
  }),
};

const updateCatalogue = {
  params: Joi.object().keys({
    catalogueId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(cataloguePayload).min(1),
};

const deleteCatalogue = {
  params: Joi.object().keys({
    catalogueId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCatalogue,
  getCatalogues,
  getCatalogue,
  updateCatalogue,
  deleteCatalogue,
};

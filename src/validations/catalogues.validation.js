const Joi = require('joi');
const { objectId } = require('./custom.validation');

let color = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string().required(),
  code2: Joi.string(),
  code3: Joi.string(),
  image: Joi.string(),
});

let type = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.string().required(),
});

const createCatalogue = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    price: Joi.number(),
    description: Joi.string().trim(),
    category: Joi.string().required(),
    types: Joi.array().items(type),
    colors: Joi.array().items(color),
    logo: Joi.string().trim(),
    banners: Joi.array().items(Joi.string()),
    images: Joi.array().items(Joi.string()),
    featureTexts: Joi.array().items(Joi.string()),
    featureImages: Joi.array().items(Joi.string()),
  }),
};

const getCatalogues = {
  query: Joi.object().keys({
    search: Joi.string().optional().allow(''),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCatalogue = {
  params: Joi.object().keys({
    CatalogueId: Joi.string().custom(objectId),
  }),
};

const updateCatalogue = {
  params: Joi.object().keys({
    CatalogueId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      price: Joi.number(),
    })
    .min(1),
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

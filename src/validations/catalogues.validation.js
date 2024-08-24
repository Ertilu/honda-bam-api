const Joi = require('joi');
const { objectId } = require('./custom.validation');

let color = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string().required(),
  image: Joi.string().required(),
});

const createCatalogue = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    price: Joi.number(),
    description: Joi.string().trim(),
    type: Joi.string().trim(),
    colors: Joi.array().items(color),
    logo: Joi.string().trim(),
    banner: Joi.string().trim(),
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
    CatalogueId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCatalogue,
  getCatalogues,
  getCatalogue,
  updateCatalogue,
  deleteCatalogue,
};

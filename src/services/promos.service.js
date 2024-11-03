const httpStatus = require('http-status');
const { Promo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Promo
 * @returns {Promise<Promo>}
 */
const createPromo = async (body) => {
  const newBody = {
    ...body,
  };
  return Promo.create(newBody);
};

/**
 * Query for promos
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 */
const queryPromos = async (filter, options) => {
  const promos = await Promo.paginate(filter, options);
  return promos;
};

/**
 * Get promo by id
 * @param {Object} id
 * @returns {Promise<Promo>}
 */
const getPromoById = async (id) => {
  return Promo.findById(id);
};

/**
 * Update Promo by id
 * @param {Object} promoId
 * @param {Object} updateBody
 * @returns {Promise<Promo>}
 */
const updatePromoById = async (promoId, updateBody) => {
  const promo = await getPromoById(promoId);

  const newBody = {
    ...updateBody,
  };

  if (!promo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Promo not found');
  }

  Object.assign(promo, newBody);

  await promo.save();
  return promo;
};

/**
 * Delete promo by id
 * @param {Object} promoId
 * @returns {Promise<Promo>}
 */
const deletePromoById = async (promoId) => {
  const promo = await getPromoById(promoId);
  if (!promo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Promo not found');
  }
  await promo.remove();
  return promo;
};

module.exports = {
  createPromo,
  queryPromos,
  getPromoById,
  updatePromoById,
  deletePromoById,
};

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const promosValidation = require('../../validations/promos.validation');
const promosController = require('../../controllers/promos.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(promosValidation.getPromos), promosController.getPromos)
  .post(validate(promosValidation.createPromo), promosController.createPromo);

module.exports = router;

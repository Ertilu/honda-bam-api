const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const inStockValidation = require('../../validations/in-stock.validation');
const inStockController = require('../../controllers/in-stock.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageInStock'), validate(inStockValidation.createInStock), inStockController.createInStock)
  .get(auth('getInStock'), validate(inStockValidation.getInStocks), inStockController.getInStocks);

router.route('/:inStockId').get(auth('getInStock'), validate(inStockValidation.getInStock), inStockController.getInStock);
// .patch(auth('manageInStock'), validate(inStockValidation.updateInStock), inStockController.updateInStock)
// .delete(auth('manageInStock'), validate(inStockValidation.deleteInStock), inStockController.deleteInStock);

module.exports = router;

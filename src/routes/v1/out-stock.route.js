const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const outStockValidation = require('../../validations/out-stock.validation');
const outStockController = require('../../controllers/out-stock.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageOutStock'), validate(outStockValidation.createOutStock), outStockController.createOutStock)
  .get(auth('getOutStock'), validate(outStockValidation.getOutStocks), outStockController.getOutStocks);

router
  .route('/:outStockId')
  .get(auth('getOutStock'), validate(outStockValidation.getOutStock), outStockController.getOutStock);
// .patch(auth('manageOutStock'), validate(outStockValidation.updateOutStock), outStockController.updateOutStock)
// .delete(auth('manageOutStock'), validate(outStockValidation.deleteOutStock), outStockController.deleteOutStock);

module.exports = router;

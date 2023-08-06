const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const inventoryRoute = require('./inventory.route');
const inStockRoute = require('./in-stock.route');
const outStockRoute = require('./out-stock.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/inventory',
    route: inventoryRoute,
  },
  {
    path: '/in-stock',
    route: inStockRoute,
  },
  {
    path: '/out-stock',
    route: outStockRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

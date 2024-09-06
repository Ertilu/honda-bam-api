const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const cataloguesRoute = require('./catalogues.route');
const imagesRoute = require('./images.route');
const docsRoute = require('./docs.route');
const promosRoute = require('./promos.route');
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
    path: '/catalogues',
    route: cataloguesRoute,
  },
  {
    path: '/images',
    route: imagesRoute,
  },
  {
    path: '/promos',
    route: promosRoute,
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

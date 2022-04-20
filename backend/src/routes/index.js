const express = require("express");

const typePlaceRoute = require("./typeplace.route");
const tourRoute = require("./tour.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/typeplace",
    route: typePlaceRoute,
  },
  {
    path: "/tour",
    route: tourRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

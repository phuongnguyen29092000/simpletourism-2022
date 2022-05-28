const express = require("express");

const typePlaceRoute = require("./typeplace.route");
const tourRoute = require("./tour.route");
const userRoute = require("./user.route");
const ticketRoute = require("./ticket.route");
const feedbackRoute = require("./feedback.route");
const authRoute = require("./auth.route");
const paymentRoute = require("./payment.route");

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
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/ticket",
    route: ticketRoute,
  },
  {
    path: "/feedback",
    route: feedbackRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

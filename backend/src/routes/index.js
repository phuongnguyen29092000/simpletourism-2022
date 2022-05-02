const express = require("express");

const typePlaceRoute = require("./typeplace.route");
const tourRoute = require("./tour.route");
const userRoute = require('./user.route')

const router = express.Router();

const defaultRoutes = [{
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
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
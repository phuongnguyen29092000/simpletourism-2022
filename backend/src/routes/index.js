const express = require('express');

const typePlaceRoute = require('./typeplace.route')

const router = express.Router();

const defaultRoutes = [{
    path: '/typeplace',
    route: typePlaceRoute
}];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
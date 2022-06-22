const express = require("express");
const router = express.Router();
const { StatisticController } = require("../controllers");
const auth = require('../middlewares/auth')

router.route("/owner/:ownerId/:year/:month").get(auth('owner'), StatisticController.showStatisticPerMonth);
router.route("/owner/:ownerId/:year/").get(auth('owner'), StatisticController.showStatisticPerYear);
router.route("/admin/:year").get(auth('admin'),StatisticController.getStatisticYearAdmin);
router.route("/admin/:year/:month").get(auth('admin'),StatisticController.getStatisticMonthAdmin);

module.exports = router;

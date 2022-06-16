const express = require("express");
const router = express.Router();
const { StatisticController } = require("../controllers");

router.route("/:year/:month").get(StatisticController.showStatisticPerMonth);
router.route("/:year/").get(StatisticController.showStatisticPerYear);
module.exports = router;

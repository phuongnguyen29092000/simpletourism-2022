const express = require("express");
const router = express.Router();
const { StatisticController } = require("../controllers");

router.route("/owner/:ownerId/:year/:month").get(StatisticController.showStatisticPerMonth);
router.route("/owner/:ownerId/:year/").get(StatisticController.showStatisticPerYear);
module.exports = router;

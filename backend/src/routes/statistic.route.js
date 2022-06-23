const express = require("express");
const router = express.Router();
const { StatisticController } = require("../controllers");

router.route("/:year").get(StatisticController.showStatisticPerYear);
module.exports = router;

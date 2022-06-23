const express = require("express");
const router = express.Router();
const { StatisticController } = require("../controllers");
const auth = require("../middlewares/auth");

router
  .route("owner/:ownerId/:year/")
  .get(StatisticController.showStatisticPerYear);
router
  .route("/admin/:year")
  .get(auth("admin"), StatisticController.getStatisticYearAdmin);
router
  .route("/admin/:year/:month")
  .get(auth("admin"), StatisticController.getStatisticMonthAdmin);

module.exports = router;

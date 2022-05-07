const express = require("express");

const { TourController } = require("../controllers");

const upLoadImage = require("../middlewares/imgUpload");

const router = express.Router();

router.route("/trong-nuoc").get(TourController.getDomesticTour);
router.route("/quoc-te").get(TourController.getInternationalTour);

router
  .route("/")
  .get(TourController.getAllTour)
  .post(
    upLoadImage.fields([
      { name: "imageAvatar", maxCount: 1 },
      { name: "imageSlide1", maxCount: 1 },
      { name: "imageSlide2", maxCount: 1 },
      { name: "imageSlide3", maxCount: 1 },
    ]),
    TourController.createTour
  );

router
  .route("/:id")
  .get(TourController.getTour)
  .delete(TourController.deleteTour)
  .patch(TourController.updateTour);

module.exports = router;

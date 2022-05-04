const express = require("express");

const { TourController } = require("../controllers");

const upLoadImage = require("../middlewares/imgUpload");

const router = express.Router();

router
  .route("/")
  .get(TourController.getAllTour)
  .post(
    upLoadImage.fields([
      { name: "imageAvatar", maxCount: 1 },
      { name: "imageSlides", maxCount: 5 },
    ]),
    TourController.createTour
  );

router
  .route("/:id")
  .get(TourController.getTour)
  .delete(TourController.deleteTour)
  .patch(TourController.updateTour);

module.exports = router;

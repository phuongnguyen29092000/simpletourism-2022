const express = require("express");

const { TourController, ticketController } = require("../controllers");

const upLoadImage = require("../middlewares/imgUpload");
const auth = require("../middlewares/auth");

const router = express.Router();


router.route("/trong-nuoc").get(TourController.getDomesticTour);
router.route("/quoc-te").get(TourController.getInternationalTour);
router.route("/tour-noi-bat").get(TourController.getOutStandingTours);

router
  .route("/:idTour/tickets")
  .get(auth('owner'), ticketController.getTicketPerTour);
router.route("/search").get(TourController.searchByText);

router
  .route("/")
  .get(TourController.getAllTour)
  .post(
    //auth('owner'),
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
  .delete(auth('owner'), TourController.deleteTour)
  .put(auth('owner'),upLoadImage.fields([
    { name: "imageAvatar", maxCount: 1 },
    { name: "imageSlide1", maxCount: 1 },
    { name: "imageSlide2", maxCount: 1 },
    { name: "imageSlide3", maxCount: 1 },
  ]),TourController.updateTour);

router
  .route("/owner/:ownerId")
  .get(auth('owner'),TourController.getTourByOwner);



module.exports = router;

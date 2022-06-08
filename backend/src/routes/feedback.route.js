const express = require("express");

const { FeedbackController } = require("../controllers");
const auth = require("../middlewares/auth");
const createFeedbackMiddleWare = require("../middlewares/createFeedbackMiddleWare");

const router = express.Router();

router

  .route("/")
  .post(
    auth("customer"),
    createFeedbackMiddleWare(),
    FeedbackController.createFeedback
  )
  .get(auth("admin"), FeedbackController.getAllFeedback);

router.route("/tour/:tourId").get(FeedbackController.getFeedbackOfTour);
router
  .route("/:feedbackId")
  .delete(auth("customer", "admin"), FeedbackController.deleteFeedback);

module.exports = router;

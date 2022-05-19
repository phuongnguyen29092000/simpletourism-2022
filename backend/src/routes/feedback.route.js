const express = require("express");

const { FeedbackController } = require("../controllers");
const auth = require('../middlewares/auth')

const router = express.Router();

router
    .route("/")
    .post(auth('customer'), FeedbackController.createFeedback)
    .get(FeedbackController.getAllFeedback);

router.route("/tour/:tourId").get(FeedbackController.getFeedbackOfTour);

module.exports = router;
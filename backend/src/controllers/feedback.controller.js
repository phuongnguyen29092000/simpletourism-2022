const catchAsync = require("../utils/catchAsync");
const { FeedbackService } = require("../services");

const createFeedback = catchAsync(async (req, res) => {
  const feedback = await FeedbackService.createFeedback(req.body);
  if (!feedback) {
    res.status(400).json({
      status: 400,
      message: "Can not Create new Feedback for this tour!",
    });
  } else {
    res.status(201).json({
      status: 201,
      data: feedback,
    });
  }
});

const getAllFeedback = catchAsync(async (req, res) => {
  const feedbacks = await FeedbackService.getAllFeedback();
  if (!feedbacks) {
    res.status(400).json({
      status: 400,
      message: "Feedback Not Found!",
    });
  } else {
    res.status(200).json({
      status: 200,
      totoResult: feedbacks.length,
      data: feedbacks,
    });
  }
});

const getFeedbackOfTour = catchAsync(async (req, res) => {
  const feedbacks = await FeedbackService.getFeedbackOfTour(req.params.tourId);
  if (!feedbacks) {
    res.status(400).json({
      status: 400,
      message: "Feedback Not Found!",
    });
  } else {
    res.status(200).json({
      status: 200,
      totalResult: feedbacks.length,
      data: feedbacks,
    });
  }
});

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackOfTour,
};

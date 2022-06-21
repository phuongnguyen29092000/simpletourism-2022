const catchAsync = require("../utils/catchAsync");
const { FeedbackService } = require("../services");
const ApiError = require("../utils/ApiError");
const {feedbackSchema} = require('../validations');

const createFeedback = catchAsync(async (req, res, next) => {
  const feedbackBody = req.body;
  const validation = feedbackSchema.validate(feedbackBody);
  if (validation.error) {
    return next(
      new ApiError(
        "Thông tin nhập vào không hợp lệ, vui lòng kiểm tra lại!",
        400
      )
    );
  }
  const feedback = await FeedbackService.createFeedback(feedbackBody);
  if (!feedback) {
    return next(
      new ApiError("Can Not Create New Feedback For This Tour!", 400)
    );
  } else {
    res.status(201).json({
      status: 201,
      data: feedback,
    });
  }
});

const getAllFeedback = catchAsync(async (req, res, next) => {
  const feedbacks = await FeedbackService.getAllFeedback();
  if (!feedbacks || feedbacks.length === 0) {
    return next(new ApiError("Feedback Not Found!", 404));
  } else {
    res.status(200).json({
      status: 200,
      totoResult: feedbacks.length,
      data: feedbacks,
    });
  }
});

const getFeedbackOfTour = catchAsync(async (req, res, next) => {
  const feedbacks = await FeedbackService.getFeedbackOfTour(req.params.tourId);
  if (!feedbacks || feedbacks.length === 0) {
    return next(
      new ApiError(
        `That Tour With Id ${req.params.tourId} Do Not Have Any Feedback!`,
        404
      )
    );
  } else {
    res.status(200).json({
      status: 200,
      totalResult: feedbacks.length,
      data: feedbacks,
    });
  }
});

const deleteFeedback = catchAsync(async (req, res, next) => {
  const deletedFeedback = await FeedbackService.deleteFeedback(
    req.params.feedbackId
  );
  if (deletedFeedback !== 1) {
    return next(
      new ApiError(
        `Can Not Delete Feedback With Id ${req.params.feedbackId}`,
        400
      )
    );
  } else {
    res.status(204).send();
  }
});

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackOfTour,
  deleteFeedback,
};

const { Feedback } = require("../models");

const createFeedback = async (body) => {
  const feedback = await Feedback.create(body);
  return Feedback.findById(feedback._id).populate({ path: "customer" });
};

const getAllFeedback = async () => {
  const feedbacks = await Feedback.find()
    .populate({ path: "customer" })
    .populate({ path: "customer" });
  return feedbacks;
};

const getFeedbackOfTour = async (idTour) => {
  const feedbacks = await Feedback.find({ tour: { $eq: idTour } }).populate({
    path: "customer",
  });
  return feedbacks;
};

const deleteFeedback = async (idFeedback) => {
  const rs = await Feedback.deleteOne({ _id: idFeedback });
  return rs.deletedCount;
};

const updateFeedback = async (idFeedback, body) => {
  const feedback = await Feedback.findByIdAndUpdate(idFeedback, body);
  return feedback;
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackOfTour,
  deleteFeedback,
  updateFeedback,
};

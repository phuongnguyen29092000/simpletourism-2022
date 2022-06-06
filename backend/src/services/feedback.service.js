const { Feedback, Ticket } = require("../models");
const mongoose = require("mongoose");

const createFeedback = async (body) => {
  const feedback = await Feedback.create(body);
  return Feedback.findById(feedback._id).populate({ path: "customer" });
};

const checkAuthozFeeback = async(customerId, tourId) => {
  const tickets = await Ticket.aggregate([
    { $match: 
      { customer: new mongoose.Types.ObjectId(customerId),
        tour: new mongoose.Types.ObjectId(tourId),
        status: 1,
      },
    },
  ])
  if(tickets.length == 0) return false
  else return true
}

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
  checkAuthozFeeback
};

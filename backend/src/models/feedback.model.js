const mongoose = require("mongoose");
const { Tour } = require("../models");

const feedbackSchema = mongoose.Schema(
  {
    tour: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Tour",
      required: [true, "Feedback must belong to a tour!"],
    },
    customer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "Feedback must belong to a customer!"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      minlength: 0,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
    });
  }
};

feedbackSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.tour);
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

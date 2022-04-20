const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
  {
    percent: {
      type: Number,
      required: [true, "discount must have a percent"],
    },
    content: String,
    timeStart: {
      type: Date,
      required: [true, "Discount must have a time start!"],
    },
    timeEnd: {
      type: Date,
      required: [true, "Discount must have a time end!"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;

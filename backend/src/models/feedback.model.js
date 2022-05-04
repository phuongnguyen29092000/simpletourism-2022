const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    tour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tour",
        required: [true, "Feedback must belong to a tour!"],
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
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
}, {
    timestamps: true,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
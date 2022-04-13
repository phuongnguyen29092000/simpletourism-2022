const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    idTour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tour",
        required: [true, "Feedback must belong to a tour!"],
    },
    email: {
        type: String,
        required: [true, "Feedback must have a email!"],
        unique: true,
        trim: true,
        lowercase: true,
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
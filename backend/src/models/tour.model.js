const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "Tour must have a name!"],
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 1024,
        required: [true, "Tour must have a description!"],
    },
    imageAvatar: {
        type: String,
        maxlength: 500,
        trim: true,
    },
    price: {
        type: Number,
        require: true,
        min: 0,
        max: 100000000,
    },
    timeStart: {
        type: Date,
        required: [true, "Tour must have a time start!"],
    },
    timeEnd: {
        type: Date,
        required: [true, "Tour must have a time end!"],
    },
    amount: {
        type: Number,
        require: true,
        min: 0,
        max: 50,
        default: 50,
    },
    hotelName: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: [true, "Tour must have a hotel name!"],
    },
    region: {
        type: Number,
        min: 1,
        max: 3,
        required: [true, "Tour must have a regions!"],
    },
    typePlace: {
        type: String,
        minlength: 0,
        required: [true, "Tour must have a type place"],
    },
    discount: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
    },
    schedule: {
        type: String,
        minlength: 20,
        maxlength: 1024,
        required: true,
    },
}, {
    timestamps: true,
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
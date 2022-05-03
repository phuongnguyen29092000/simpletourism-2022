const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    idTour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tour",
        required: [true, "Ticket must have an id tour!"],
    },
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: [true, "Ticket must include customer's name!"],
    },
    phone: {
        type: String,
        minlength: 0,
        maxlength: 10,
        required: [true, "Ticket must have a customer's phone number!"],
    },
    numberPeople: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Ticket must have number of people!"],
    },
    status: {
        type: Number,
        min: 0,
        max: 3,
        default: 0,
    },
}, {
    timestamps: true,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
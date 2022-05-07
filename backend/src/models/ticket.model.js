const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    tour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tour",
        required: [true, "Ticket must have an id tour!"],
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    phone: {
        type: String,
        minlength: 0,
        maxlength: 10,
        required: [true, "Ticket must have a customer's phone number!"],
    },
    paymentPrice: {
        type: Number,
        require: true,
        min: 0,
        max: 100000000,
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
        max: 2,
        default: 0,
    },
}, {
    timestamps: true,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
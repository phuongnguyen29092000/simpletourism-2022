const mongoose = require("mongoose");
const validator = require("validator");
const roles = require('../config/roles');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    givenName: {
        type: String,
        required: [true, "Please provide your given name!"],
    },
    familyName: {
        type: String,
        required: [true, "Please provide your family name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photoUrl: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: roles,
        default: "customer",
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
}, {
    timestamps: true,
});

userSchema.statics.isEmailTaken = async function(email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
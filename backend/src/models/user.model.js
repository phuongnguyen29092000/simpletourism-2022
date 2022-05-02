const mongoose = require("mongoose");
const validator = require("validator");
const roles = require('../config/roles');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    imageAvatar: String,
    role: {
        type: String,
        enum: roles,
        default: "customer",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    passwordChangedAt: Date,
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

userSchema.methods.isPasswordMatch = async function(password) {
    const user = this
    return bcrypt.compare(password, user.password)
};

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User;
const mongoose = require('mongoose');
const { tokenTypes } = require('../config/tokens');

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: tokenTypes,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: true,
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 2048,
        required: true
    },
    imageUrl: {
        type: String,
        maxlength: 500,
        trim: true
    }
}, {
    timestamps: true
})

const News = mongoose.model('New', newsSchema)

module.exports = News
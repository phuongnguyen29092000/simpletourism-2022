const mongoose = require('mongoose')

const typePlaceSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 50,
        required: true,
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: 1024,
        required: true
    }
}, {
    timestamps: true
})

const TypePlace = mongoose.model('TypePlace', typePlaceSchema)

module.exports = TypePlace
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Category', categorySchema)
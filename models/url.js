const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }]
}, { timestamps: true })


module.exports = mongoose.model('url', urlSchema)
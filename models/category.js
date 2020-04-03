const mongoose = require('mongoose')
const Article = require('./article.js')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Category', categorySchema)
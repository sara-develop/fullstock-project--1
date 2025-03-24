const mongoose = require("mongoose")
const { timeStamp } = require("console")

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timeStamp: true
})

module.exports = mongoose.model('Post', PostSchema)
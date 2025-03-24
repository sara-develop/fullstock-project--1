const mongoose = require("mongoose")
const { timeStamp } = require("console")

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: [String],
        default: []
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timeStamp: true
})

module.exports = mongoose.model('Todo', TodoSchema)
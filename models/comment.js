const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema ({
    comment: {type: String, required: [true, "please write a comment"]},
    rating: {type: String, default: 0, min: 0, max: 5},
    game: {type: mongoose.Types.ObjectId, ref: "Games"}
},
{timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
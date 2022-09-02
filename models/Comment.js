const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema ({
    comment: {type: String, required: [true, "please write a comment"]},
    rating: {type: Number, default: 0, min: 0, max: 5},
    game: {type: mongoose.Types.ObjectId, ref: "Games"},
    user: {type: mongoose.Types.ObjectId, ref: "User"},
},
{timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema ({
    comment: String,
    rating: {type: String, default: 0, min: 0, max: 5},
},
{timestamps: true})

const Comment = mongoose.model('Comment', reviewSchema)
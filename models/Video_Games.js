const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        image: {type: String,required: true},
        release: {type: String},
        genre: {type: String},
        price: {type: Number},
        trailer: {type: String},
        platform: {type: String},
        rating: {type: String, default: 0, min: 0, max: 5},
        comments: {type: mongoose.Types.ObjectId, ref: "Comment"},
    },
);

     const Games = mongoose.model('Games', gamesSchema);
     module.exports = Games;

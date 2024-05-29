import mongoose, {Document, Schema}  from "mongoose";
import Comment from "../comments/comments.interface";



interface Games extends Document {
    name: string;
    image: string;
    release: string;
    genre: string;
    price: number;
    trailer: string;
    platform: string;
    rating: string;
    comments: mongoose.Types.ObjectId[] | Comment[];
    createdAt: Date;
}

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
        createdAt: { type: Date, default: Date.now }
        
    },
);

// Define mongoose model with User interface
const Games = mongoose.model<Games>('Games', gamesSchema);

export default Games
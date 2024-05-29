import mongoose, {Document, Schema} from "mongoose";
import User from "../users/users.interface"; 
import Games from "../games/games.interface";

interface Comment extends Document {
    comment: string;
    rating: number;
    game: mongoose.Types.ObjectId | Games;
    user: mongoose.Types.ObjectId | User;
    createdAt: Date;
}

const commentSchema = new mongoose.Schema ({
    comment: {type: String, required: [true, "please write a comment"]},
    rating: {type: Number, default: 0, min: 0, max: 5},
    game: {type: mongoose.Types.ObjectId, ref: "Games"},
    user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    createdAt: {type: Date, default: Date.now}
});

const Comment = mongoose.model<Comment>('Comment', commentSchema);

export default Comment;
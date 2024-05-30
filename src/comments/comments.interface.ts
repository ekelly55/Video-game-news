import mongoose, {Document, Schema} from "mongoose";
import {IGames} from "../games/games.interface";
import {IUser} from "../users/users.interface";
import Games from "../games/games.interface";
import User from "../users/users.interface";

export interface IComment extends Document {
    comment: string;
    rating: number;
    game: mongoose.Types.ObjectId | IGames;
    user: mongoose.Types.ObjectId | IUser;
    createdAt: Date;
}

const commentSchema = new mongoose.Schema ({
    comment: {type: String, required: [true, "please write a comment"]},
    rating: {type: Number, default: 0, min: 0, max: 5},
    game: {type: mongoose.Types.ObjectId, ref: "Games", required: true},
    user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    createdAt: {type: Date, default: Date.now}
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
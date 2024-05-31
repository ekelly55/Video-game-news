import mongoose, {Document, Schema, Types} from "mongoose";
import Comment from "../comments/comments.interface";
import { IComment } from "../comments/comments.interface";


export interface IUser extends Document {
    _id: Types.ObjectId
    email: string;
    password: string;
    username: string;
    avatar: string;
    comments: mongoose.Types.ObjectId[] | IComment[];
    createdAt: Date;
}

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: [true, "Please provide a valid email address"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Please provide a valid password"],
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        avatar: {
            type: String,
            default: "https://i.imgur.com/VfBLBKRs.png"
        },
        
        comments:[{type: mongoose.Types.ObjectId, ref: "Comment"}],
        createdAt: {type: Date, default: Date.now}
    },

);

const User = mongoose.model<IUser>('User', userSchema)

export default User
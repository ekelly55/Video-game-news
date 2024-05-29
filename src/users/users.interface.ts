import mongoose, {Document, Schema} from "mongoose";
import Comment from "../comments/comments.interface";


interface User extends Document {
    email: string;
    password: string;
    username: string;
    avatar: string;
    comments: mongoose.Types.ObjectId[] | Comment[];
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
        
        comments:{type: mongoose.Types.ObjectId, ref: "Comment"},
        createdAt: {type: Date, default: Date.now}
    },

);

const User = mongoose.model<User>('User', userSchema)

export default User
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
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
    comments: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;

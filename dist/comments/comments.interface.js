"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    comment: { type: String, required: [true, "please write a comment"] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    game: { type: mongoose_1.default.Types.ObjectId, ref: "Games", required: true },
    user: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;

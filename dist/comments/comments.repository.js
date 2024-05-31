"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_interface_1 = __importDefault(require("./comments.interface"));
class CommentsRepository {
    //Create comment
    async createComment(commentData) {
        try {
            const newComment = await comments_interface_1.default.create(commentData);
            return newComment;
        }
        catch (error) {
            throw new Error(`Error creating comment: ${error}`);
        }
    }
    //get comments for a game
    async getCommentsByGameId(gameId) {
        try {
            const comments = await comments_interface_1.default.find({ game: gameId }).populate('user').exec();
            return comments;
        }
        catch (error) {
            throw new Error(`Error fetching comments for game ID ${gameId}: ${error}`);
        }
    }
    //delete comment
    async deleteComment(commentId) {
        try {
            await comments_interface_1.default.findByIdAndDelete(commentId);
        }
        catch (error) {
            throw new Error(`Error deleting comment with ID ${commentId}: ${error}`);
        }
    }
}
exports.default = CommentsRepository;

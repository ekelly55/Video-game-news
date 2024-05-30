"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_interface_1 = __importDefault(require("./comments.interface"));
class CommentsRepository {
    //Create comment
    createComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newComment = yield comments_interface_1.default.create(commentData);
                return newComment;
            }
            catch (error) {
                throw new Error(`Error creating comment: ${error}`);
            }
        });
    }
    //get comments for a game
    getCommentsByGameId(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comments_interface_1.default.find({ game: gameId }).populate('user').exec();
                return comments;
            }
            catch (error) {
                throw new Error(`Error fetching comments for game ID ${gameId}: ${error}`);
            }
        });
    }
    //delete comment
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield comments_interface_1.default.findByIdAndDelete(commentId);
            }
            catch (error) {
                throw new Error(`Error deleting comment with ID ${commentId}: ${error}`);
            }
        });
    }
}
exports.default = CommentsRepository;

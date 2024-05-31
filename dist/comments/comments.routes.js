"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const method_override_1 = __importDefault(require("method-override"));
const comments_repository_1 = __importDefault(require("./comments.repository"));
const commentsRouter = express.Router();
const commentsRepo = new comments_repository_1.default();
commentsRouter.use(express.json());
commentsRouter.use(express.urlencoded({ extended: false }));
commentsRouter.use((0, method_override_1.default)('_method'));
// POST add comment to game
commentsRouter.post('/:gameId', async (req, res, next) => {
    try {
        const gameId = req.params.gameId;
        const commentData = { ...req.body, game: gameId };
        const newComment = await commentsRepo.createComment(commentData);
        return res.redirect(`/games/${gameId}`);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
//GET comments index for game
commentsRouter.get('/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const foundComments = await commentsRepo.getCommentsByGameId(gameId);
        if (!foundComments) {
            return res.status(404).send("Comment not found");
        }
        const context = { comments: [foundComments] };
        res.render('comment_index.ejs', context);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});
//DELETE comment
commentsRouter.delete('/:gameId/comments/:commentId', async (req, res, next) => {
    try {
        const gameId = req.params.gameId;
        const commentId = req.params.commendId;
        const deletedComment = await commentsRepo.deleteComment(commentId);
        return res.redirect(`/games/${gameId}`);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.default = commentsRouter;

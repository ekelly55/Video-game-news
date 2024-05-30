"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gamesSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    release: { type: String },
    genre: { type: String },
    price: { type: Number },
    trailer: { type: String },
    platform: { type: String },
    rating: { type: String, default: 0, min: 0, max: 5 },
    comments: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now }
});
// Define mongoose model with User interface
const Games = mongoose_1.default.model('Games', gamesSchema);
exports.default = Games;

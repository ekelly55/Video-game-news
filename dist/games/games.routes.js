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
const express = __importStar(require("express"));
const method_override_1 = __importDefault(require("method-override"));
const games_interface_1 = __importDefault(require("./games.interface"));
const comments_interface_1 = __importDefault(require("../comments/comments.interface"));
const gamesRouter = express.Router();
gamesRouter.use(express.json());
gamesRouter.use(express.urlencoded({ extended: false }));
gamesRouter.use((0, method_override_1.default)('_method'));
// GET add game form
gamesRouter.get('/new', (req, res) => {
    res.render('games_new.ejs');
});
// POST add game to db
gamesRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameData = req.body;
        const foundGame = yield games_interface_1.default.exists({ name: gameData.name });
        if (!foundGame) {
            return res.status(400).send("Game already exists");
        }
        else {
            const newGame = yield games_interface_1.default.create(gameData);
            return res.redirect('/games');
        }
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
//GET games index
gamesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGames = yield games_interface_1.default.find();
        const context = { games: allGames };
        res.render('games_index.ejs', context);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}));
//GET game show page
gamesRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundGame = yield games_interface_1.default.findById(req.params.id);
        if (!foundGame) {
            res.status(404).send('Game not found');
            return;
        }
        const gameComments = yield comments_interface_1.default.find({ game: foundGame._id }).populate('user').exec();
        const context = { game: foundGame, id: foundGame._id, comments: gameComments };
        res.render('games_show.ejs,', context);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
}));
//DELETE game
gamesRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedGame = yield games_interface_1.default.findByIdAndDelete(req.params.id);
        res.redirect('/games');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
// GET update game form
gamesRouter.get('/:id/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('games_edit.ejs');
}));
//PUT update game in db
gamesRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGame = yield games_interface_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/games');
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
exports.default = gamesRouter;

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
const games_repository_1 = __importDefault(require("./games.repository"));
const gamesRouter = express.Router();
const gamesRepo = new games_repository_1.default();
gamesRouter.use(express.json());
gamesRouter.use(express.urlencoded({ extended: false }));
gamesRouter.use((0, method_override_1.default)('_method'));
// GET add game form
gamesRouter.get('/new', (req, res) => {
    res.render('games_new.ejs');
});
// POST add game to db
gamesRouter.post('/', async (req, res, next) => {
    try {
        const gameData = req.body;
        const newGame = await gamesRepo.createGame(gameData);
        return res.redirect('/games');
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
//GET games index
gamesRouter.get('/', async (req, res, next) => {
    try {
        const allGames = await gamesRepo.getAllGames();
        const context = { games: allGames };
        res.render('games_index.ejs', context);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});
//GET game show page
gamesRouter.get('/:id', async (req, res, next) => {
    try {
        const foundGame = await gamesRepo.getOneGame(req.params.id);
        if (!foundGame) {
            res.status(404).send('Game not found');
            return;
        }
        const context = { game: foundGame };
        res.render('games_show.ejs,', context);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});
//DELETE game
gamesRouter.delete('/:id', async (req, res, next) => {
    try {
        await gamesRepo.deleteGame(req.params.id);
        res.redirect('/games');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
// GET update game form
gamesRouter.get('/:id/edit', async (req, res, next) => {
    res.render('games_edit.ejs');
});
//PUT update game in db
// gamesRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const updatedGame = await Games.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('/games')
//     }
//     catch(err) {
//         console.error(err);
//         next(err);
//     }
// });
exports.default = gamesRouter;

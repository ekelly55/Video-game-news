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
const games_interface_1 = __importDefault(require("./games.interface"));
class GamesRepository {
    createGame(gameData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGame = yield games_interface_1.default.create(gameData);
                return newGame;
            }
            catch (error) {
                throw new Error(`Error creating game: ${error}`);
            }
        });
    }
    getAllGames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield games_interface_1.default.find();
                return games;
            }
            catch (error) {
                throw new Error(`Error fetching games ${error}`);
            }
        });
    }
    getOneGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield games_interface_1.default.findById(gameId);
                return game;
            }
            catch (error) {
                throw new Error(`Error fetching game with id ${gameId}: ${error}`);
            }
        });
    }
    editGame(gameId, gameData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Editing game with ID: ${gameId}`);
                const updatedGame = yield games_interface_1.default.findByIdAndUpdate(gameId, gameData, { new: true }).exec();
                console.log(`Updated game: ${updatedGame}`);
                return updatedGame;
            }
            catch (error) {
                throw new Error(`Error editing game with id ${gameId}: ${error}`);
            }
        });
    }
    deleteGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield games_interface_1.default.findByIdAndDelete(gameId);
            }
            catch (error) {
                throw new Error(`Error deleting game with ID ${gameId}: ${error}`);
            }
        });
    }
}
exports.default = GamesRepository;

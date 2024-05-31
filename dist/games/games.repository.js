"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const games_interface_1 = __importDefault(require("./games.interface"));
class GamesRepository {
    async createGame(gameData) {
        try {
            const newGame = await games_interface_1.default.create(gameData);
            return newGame;
        }
        catch (error) {
            throw new Error(`Error creating game: ${error}`);
        }
    }
    async getAllGames() {
        try {
            const games = await games_interface_1.default.find();
            return games;
        }
        catch (error) {
            throw new Error(`Error fetching games ${error}`);
        }
    }
    async getOneGame(gameId) {
        try {
            const game = await games_interface_1.default.findById(gameId);
            return game;
        }
        catch (error) {
            throw new Error(`Error fetching game with id ${gameId}: ${error}`);
        }
    }
    // async editGame(gameId: string, gameData: Partial<IGames>): Promise<IGames | null> {
    //     try {
    //         console.log(`Editing game with ID: ${gameId}`);
    //         const updatedGame =  await Games.findByIdAndUpdate(gameId, gameData, {new: true}).exec();
    //         console.log(`Updated game: ${updatedGame}`);
    //         return updatedGame as IGames | null;
    //     } catch (error) {
    //         throw new Error(`Error editing game with id ${gameId}: ${error}`);
    //     }
    // }
    async deleteGame(gameId) {
        try {
            await games_interface_1.default.findByIdAndDelete(gameId);
        }
        catch (error) {
            throw new Error(`Error deleting game with ID ${gameId}: ${error}`);
        }
    }
}
exports.default = GamesRepository;

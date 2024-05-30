import Games from "./games.interface";
import { IGames } from "./games.interface";
import IGamesRepository from "./Igames.repository";

class GamesRepository implements IGamesRepository {
    async createGame(gameData: IGames): Promise<IGames> {
        try {
            const newGame = await Games.create(gameData);
            return newGame;
        } catch (error) {
            throw new Error(`Error creating game: ${error}`);
        }
    }

    async getAllGames(): Promise<IGames[] | null> {
        try {
            const games = await Games.find()
            return games;
        } catch (error) {
            throw new Error(`Error fetching games ${error}`);
        }
    }

    
    async getOneGame(gameId: string): Promise<IGames | null> {
        try {
            const game = await Games.findById(gameId);
            return game
        } catch (error) {
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

    async deleteGame(gameId: string): Promise<void> {
        try {
            await Games.findByIdAndDelete(gameId);
        } catch (error) {
            throw new Error(`Error deleting game with ID ${gameId}: ${error}`);
        }
    }
}

export default GamesRepository
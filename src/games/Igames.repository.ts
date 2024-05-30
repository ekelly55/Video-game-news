import { IGames } from "./games.interface";


interface IGamesRepository {
    createGame(gameData: IGames): Promise<IGames>;
    getAllGames(): Promise<IGames[] | null>
    getOneGame(gameId: string): Promise<IGames | null>
    // editGame(gameId: string, gameData: Partial<IGames>): Promise<IGames> | null;
    deleteGame(gameId: string): Promise<void>;
}

export default IGamesRepository
import * as express from "express";
import { Request, Response, NextFunction } from "express"
import methodOverride from 'method-override'
import { IGames } from "./games.interface";
import GamesRepository from "./games.repository";

const gamesRouter = express.Router()
const gamesRepo = new GamesRepository();

gamesRouter.use(express.json())
gamesRouter.use(express.urlencoded({extended: false}))
gamesRouter.use(methodOverride('_method'));

// GET add game form
gamesRouter.get('/new', (req: Request, res: Response) => {
    res.render('games_new.ejs');
});

// POST add game to db
gamesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameData = req.body as IGames;
        const newGame = await gamesRepo.createGame(gameData)
        return res.redirect('/games');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

//GET games index
gamesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allGames = await gamesRepo.getAllGames()
        const context = {games: allGames};
        res.render('games_index.ejs', context);
    } catch(err) {
        console.log(err)
        res.status(500).send('Internal server error index page')
    }
});

//GET game show page
gamesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundGame = await gamesRepo.getOneGame(req.params.id);
        if(!foundGame){
            res.status(404).send('Game not found')
            return;
        }
        
        const context = {game: foundGame};
        res.send(context);
    } catch(err){
        console.log(err)
        res.status(500).send('Internal server error show page')
    }
});

//DELETE game
gamesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        await gamesRepo.deleteGame(req.params.id)
        res.redirect('/games');
    } catch (err) {
        console.log(err)
        next(err);
    }
})

// GET update game form
gamesRouter.get('/:id/edit', async (req: Request, res: Response, next: NextFunction )=>{
        res.send('edit game form goes here')
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


export default gamesRouter
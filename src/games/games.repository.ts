import * as express from "express";
import { Request, Response, NextFunction } from "express"
import methodOverride from 'method-override'
import Games from "./games.interface";
import { IGames } from "./games.interface";

const gamesRouter = express.Router()

gamesRouter.use(express.json())
gamesRouter.use(express.urlencoded({extended: false}))
gamesRouter.use(methodOverride('_method'));

//GET privacy policy
gamesRouter.get('/privacy_policy', async (req: Request, res: Response) => {
    res.render("privacy_policy");
});

//GET about us
gamesRouter.get('/about_us', (req, res) => {
    res.render('aboutus.ejs');
});

// GET add game form
gamesRouter.get('/new', (req: Request, res: Response) => {
    res.render('games_new.ejs');
});

// POST add game to db
gamesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameData = req.body as IGames;
        const foundGame = await Games.exists({name: gameData.name});
        if(!foundGame){
            return res.redirect('/:id');
        } else {
            const newGame = await Games.create(gameData)
            return res.redirect('/games');
        }
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

//GET games index
export const findAll = async (): Promise<IGames[]> => Object.values(Games);

//GET game show page
export const findOne = async (id: string): Promise<IGames> => Games[id];

//DELETE game
gamesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deletedGame = await Games.findByIdAndDelete(req.params.id)
        res.redirect('/games');
    } catch (err) {
        console.log(err)
        next(err);
    }
})

// GET update game form
gamesRouter.get('/:id/edit', async (req: Request, res: Response, next: NextFunction )=>{
        res.render('games_edit.ejs')
});

//PUT update game in db

gamesRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedGame = req.body as IGames
        const foundGame = await Games.exists({name: updatedGame.name});
        if(!foundGame){
            return res.redirect('/:id');
        } else {
            const newGame = await Games.updateOne({id: updatedGame._id})
            return res.redirect('/games');
        }
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});



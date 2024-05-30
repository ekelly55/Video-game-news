import * as express from "express";
import { Request, Response, NextFunction } from "express"
import methodOverride from 'method-override'
import Games from "./games.interface";
import { IGames } from "./games.interface";
import Comment from "../comments/comments.interface";

const gamesRouter = express.Router()

gamesRouter.use(express.json())
gamesRouter.use(express.urlencoded({extended: false}))
gamesRouter.use(methodOverride('_method'));

//GET privacy policy
gamesRouter.get('/privacy_policy', async (req: Request, res: Response) => {
    res.render("privacy_policy");
});

//GET about us
gamesRouter.get('/about_us', (req: Request, res: Response) => {
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
            return res.status(400).send("Game already exists");
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
gamesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allGames = await Games.find()
        const context = {games: allGames};
        res.render('games_index.ejs', context);
    } catch(err) {
        console.log(err)
        res.status(500).send('Internal server error')
    }
});

//GET game show page
gamesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundGame = await Games.findById(req.params.id);
        if(!foundGame){
            res.status(404).send('Game not found')
            return;
        }
        const gameComments = await Comment.find({game: foundGame._id}).populate('user').exec()
        const context = {game: foundGame, id: foundGame._id, comments: gameComments};
        res.render('games_show.ejs,', context);
    } catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
    }
});

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
        const updatedGame = await Games.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/games')
       
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});


export default gamesRouter
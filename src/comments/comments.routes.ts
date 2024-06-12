import * as express from "express";
import { Request, Response, NextFunction } from "express"
import methodOverride from 'method-override'
import Games from "../games/games.interface";
import CommentsRepository from "./comments.repository";
import { IComment } from "./comments.interface";




const commentsRouter = express.Router()

const commentsRepo = new CommentsRepository()

commentsRouter.use(express.json())
commentsRouter.use(express.urlencoded({extended: false}))
commentsRouter.use(methodOverride('_method'));


// POST add comment to game
commentsRouter.post('/:gameId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = req.params.gameId
        const commentData = {...req.body, game: gameId} as IComment;
        const newComment = await commentsRepo.createComment(commentData)
        return res.redirect(`/games/${gameId}`);
    }
    
    catch(err) {
        console.error(err);
        next(err);
    }
});

//GET comments index for game
commentsRouter.get('/:gameId/comments', async (req: Request, res: Response) => {
    try {
        const gameId = req.params.gameId;
        const foundComments = await commentsRepo.getCommentsByGameId(gameId);
        if (!foundComments) {
            return res.status(404).send("Comment not found");
        }
        const context = {comments: [foundComments]};
        res.send(context);
    } catch(err) {
        console.log(err)
        res.status(500).send('Internal server error comments index')
    }
});


//DELETE comment
commentsRouter.delete('/:gameId/comments/:commentId', async (req: Request, res: Response, next: NextFunction) => {
    try{
        //parse both ids from the req.params
        const {gameId, commentId} = req.params
        const deletedComment = await commentsRepo.getCommentsById(commentId)
       
        return res.redirect(`/games/${gameId}`);
        
    } catch (err) {
        console.log(err)
        next(err);
    }
})

export default commentsRouter
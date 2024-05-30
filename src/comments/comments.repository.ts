import * as express from "express";
import { Request, Response, NextFunction } from "express"
import methodOverride from 'method-override'
import Games from "../games/games.interface";
import Comment from "./comments.interface";
import { IComment } from "./comments.interface";




const commentsRouter = express.Router()

commentsRouter.use(express.json())
commentsRouter.use(express.urlencoded({extended: false}))
commentsRouter.use(methodOverride('_method'));


// POST add comment to game
commentsRouter.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentData = req.body as IComment;
      
        const newComment = await Comment.create(commentData)
        return res.redirect(`/games/${newComment.game}`);
    }
    
    catch(err) {
        console.error(err);
        next(err);
    }
});

//GET comments index
commentsRouter.get('/:id/', async (req: Request, res: Response) => {
    try {
        ///need to use a get game and all comments method here
        const foundComments = await Comment.findById(req.params.id).populate("game").exec()
        ///
        if (!foundComments) {
            return res.status(404).send("Comment not found");
        }
        const context = {comments: [foundComments]};
        res.render('comment_index.ejs', context);
    } catch(err) {
        console.log(err)
        res.status(500).send('Internal server error')
    }
});


//DELETE comment
commentsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const foundComment = await Comment.findById(req.params.id).populate("game").exec()
        if(!foundComment){
            return res.status(404).send("Comment not found")
        }
        const gameId = foundComment.game._id

        await Comment.findByIdAndDelete(req.params.id)
        return res.redirect(`/${gameId}`);
        
    } catch (err) {
        console.log(err)
        next(err);
    }
})

export default commentsRouter
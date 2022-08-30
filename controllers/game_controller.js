const express= require('express');
const router = express.Router();
const methodOverride = (require('method-override'))

//Middleware: will have express json and url encoded eventually
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'))

//Model import here
const db = require('../models')


//Routes will be here




// POST
router.post('/new', async (req, res) => {
    
    try{
        const newPost = await db.Games.create(req.body);
        // console.log(newPost)
        res.redirect('/games')
    
    } catch (err) {
        console.log(err)
    }
        
})

// INDEX
router.get('/', async (req, res) => {

    try {
        const allPosts = await db.Games.find()
        const context = { games: allPosts };
        // console.log(allPosts)
        //res.send(allPosts)
        res.render('games_index.ejs', context)
    } catch(err) {
        console.log(err)
        
    }
})

//New route
router.get('/new', (req,res) =>{
    res.render('games_new.ejs');
})


//Show route
router.get('/:id', async (req,res, next) =>{
    try{
        const foundGame = await db.Games.findById(req.params.id)
        console.log(foundGame);
        const context = {game: foundGame}
        res.render('games_show.ejs', context)

    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
});

//Delete Route
router.delete('/:id', async (req, res, next)=>{
    try{
        const deletedGame = await db.Games.findByIdAndDelete(req.params.id)
        console.log(deletedGame)
        res.redirect('games');

    } catch (error) {
        console.log(error)
        req.error = error
        return next();
    }
});

//Edit Route
router.get('/:id/edit', async (req, res, next)=>{
    try{
        const updatedGame = await db.Games.findById(req.params.id)
        console.log(updatedGame);
        res.render('games_edit.ejs', {game: updatedGame})

    } catch (error){
        console.log(error)
        req.error = error
        return next()
    }
})

//Update Route
router.put ('/:id', async (req,res,next)=>{
    try{
        const updatedGame = await db.Games.findByIdAndUpdate(req.params.id, req.body);
        console.log(updatedGame)
        return res.redirect('/games')

    } catch (error){
        console.log(error)
        req.error = error
        return next()
    }
})










module.exports=router;
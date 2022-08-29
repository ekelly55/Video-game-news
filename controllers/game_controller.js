const express= require('express');
const router = express.Router();


//Middleware: will have express json and url encoded eventually
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Model import here
const db = require('../models')
const videogames = require('../models')


//Routes will be here

// POST
router.post('/', async (req, res) => {

    try{
        const newPost = await db.Games.create(createdPost);
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


//Show route
router.get('/:id', async (req,res, next) =>{
    try{
        const foundGame = await db.Games.findById(req.params.id)
        console.log(foundGame);
        const context = {videogames: foundGame}
        res.render('show.ejs', context)

    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
});








module.exports=router;
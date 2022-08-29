const express= require('express');
const router = express.Router();


//Middleware: will have express json and url encoded eventually
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Model import here
const db = require('../models')


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








module.exports=router;
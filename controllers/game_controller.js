const express= require('express');
const router = express.Router();


//Middleware: will have express json and url encoded eventually
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Model import here
const db = require('..models')


//Routes will be here

// POST
router.get('/', async (req, res) => {

    try{
        const newPost = await db.*Schema*.create(createdPost);
        // console.log(newPost)
        res.redirect('/games')
    } catch (err) {
        // console.log(err)
        res.redirect('/404')
    }
})

// INDEX
router.get('/', async (req, res) => {

    try {
        const allPosts = await db.*Schema*.find()
        const context = { : };
        // console.log(allPosts)
        res.render('inddex.ejs', context)
    } catch(err) {
        console.log(err)
        res.redirect('/404')
    }
})








module.exports=router;
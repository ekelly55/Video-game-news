const express= require('express');
const router = express.Router();
const methodOverride = (require('method-override'));
const db = require('../models');


router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));


router.get('/privacy_policy', (req, res) => {
    res.render("privacy_policy")
});


router.get('/about_us', (req, res) => {
    res.render('aboutus.ejs')
});

router.get("/news", (req, res) => {
    res.render("thenews.ejs")
});


router.post('/', async (req, res) => {
    try{
        const newPost = await db.Games.create(req.body);
        res.redirect('/games')
    } catch (err) {
        console.log(err)
    } 
});


router.get('/', async (req, res) => {
    try {
        const allPosts = await db.Games.find()
        const context = {games: allPosts };
        res.render('games_index.ejs', context)
    } catch(err) {
        console.log(err)
    }
});


router.get('/new', (req,res) =>{
    res.render('games_new.ejs');
});


router.get('/:id', async (req,res, next) =>{
    try{
        const foundGame = await db.Games.findById(req.params.id)
        const gameComments = await db.Comment.find({game: foundGame._id}).populate("user").exec()
        const context = {game: foundGame, id: foundGame._id, comments: gameComments}
        res.render('games_show.ejs', context)
    } catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
});


router.delete('/:id', async (req, res, next)=>{
    try{
        const deletedGame = await db.Games.findByIdAndDelete(req.params.id)
        console.log(deletedGame)
        res.redirect('/games');
    } catch (error) {
        console.log(error)
        req.error = error
        return next();
    }
});


router.get('/:id/edit', async (req, res, next)=>{
    try{
        const updatedGame = await db.Games.findById(req.params.id)
        res.render('games_edit.ejs', {game: updatedGame})
    } catch (error){
        console.log(error)
        req.error = error
        return next()
    }
});


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
});


module.exports=router
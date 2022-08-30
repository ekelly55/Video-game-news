const express = require("express");
const router = express.Router();
const methodOverride = (require("method-override"));

//Middleware
router.use(express.json());
router.use(express.urlencoded({extended: false}));
router.use(methodOverride("_method"))

//model import
const db = require("../models");




//post new comment
router.post("/:id", async (req, res, nex) => {
    try {
        const newComment = await db.Comment.create(req.body);
        //console.log(newComment.rating)
        //res.send(newComment)
        res.redirect(`/games/${newComment.game}`)
    } catch (err) {
        console.log(err)
        next()
    }
});

//show new comment on game show page
router.get("/:id/", async (req, res, next) => {
    try {
        const foundComment = await db.Comment.findById(req.params.id).populate("game").exec()
        res.render("games_show.ejs", {comments: foundComment})
    } catch (err) {
        console.log(err)
        next()
    }
});


module.exports = router
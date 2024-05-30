const express = require("express");
const router = express.Router();
const methodOverride = (require("method-override"));
const db = require("../models");


router.use(express.json());
router.use(express.urlencoded({extended: false}));
router.use(methodOverride("_method"));

//post a comment on a game
router.post("/:id", async (req, res, nex) => {
    try {
        const newComment = await db.Comment.create(req.body);
        res.redirect(`/games/${newComment.game}`)
    } catch (err) {
        console.log(err)
        next()
    }
});

//show comments
router.get("/:id/", async (req, res, next) => {
    try {
        const foundComment = await db.Comment.findById(req.params.id).populate("game").exec()
        res.render("games_show.ejs", {comments: foundComment})
    } catch (err) {
        console.log(err)
        next()
    }
});


router.delete("/:id", async (req, res, next) => {
    try{
        const deletedComment = await db.Comment.findByIdAndDelete(req.params.id)
        console.log(deletedComment)
        res.redirect(`/games/${deletedComment.game._id}`)
    } catch (err) {
        console.log(err)
        next()
    }
});


module.exports = router
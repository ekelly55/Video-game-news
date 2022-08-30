const express = require("express");
const router = express.Router();
const methodOverride = (require("method-override"));

//Middleware
router.use(express.json());
router.use(express.urlencoded({extended: false}));
router.use(methodOverride("_method"))

//model import
const db = require("../models");


//create new comment

router.get("/new", (req, res) => {
    res.render("comment_new.ejs")
});

//post new comment
router.post("/:id", async (req, res) => {
    try {
        const newComment = await db.Comment.create(req.body);
        console.log(newComment)
        res.send(newComment)
        //res.redirect("games/:id")
    } catch (err) {
        console.log(err)
    }
});

module.exports = router
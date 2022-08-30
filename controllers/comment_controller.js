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
router.post("/", async (req, res, nex) => {
    try {
        const newComment = await db.Comment.create(req.body);
        console.log(newComment)
        res.send(newComment)
        //res.redirect("games/:id")
    } catch (err) {
        console.log(err)
        next()
    }
});

module.exports = router
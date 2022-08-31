const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');


//JSON methods
router.use(express.json());
router.use(express.urlencoded({extended:false}));


//Login route
router.get('/login', (req,res) => {
    res.render('login.ejs')
})

//Register route
router.get('/register', (req,res) =>{
    res.render('register.ejs')
})

//Create login route
router.post('/login', async (req,res,next) =>{
    try{
        let userData = req.body
        let foundUser = await db.User.findOne({email:userData.email})
        if(!foundUser) {
            return res.redirect('/register')

        } else {
            const match = await bcrypt.compare(userData.password, foundUser.password)
            console.log(match);
            if (!match) return res.send('Email or password are incorrect')
            req.session.currentUser = {
                id: foundUser._id,
                username: foundUser.username,
            }
            return res.redirect ('/games')
        }
    }catch (err) {
        console.log(err);
        req.error = error
        next()
    }
})


















module.exports = router;
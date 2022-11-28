const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const { User } = require('../models');


router.use(express.json());
router.use(express.urlencoded({extended:false}));


router.get('/login', (req,res) => {
    res.render('login.ejs')
});


router.get('/register', (req,res) =>{
    res.render('register.ejs')
});


router.post('/login', async (req,res,next) =>{
    try{
        let userData = req.body
        console.log(userData)
        let foundUser = await db.User.findOne({username:userData.username})
        console.log(foundUser)
        if(!foundUser) {
            return res.redirect('/register')
        } else {
            const match = await bcrypt.compare(userData.password, foundUser.password)
            console.log(match);
            if (!match) return res.send('Email or password are incorrect')
            console.log(req.session)
            req.session.currentUser = {
                id: foundUser._id,
                username: foundUser.username,
            }
            return res.redirect('/games')
        }
    }catch (err) {
        console.log(err);
        next()
    }
});


router.post('/register', async (req,res,next) =>{
    try{
        let userData = req.body
        let foundUser = await User.exists({email: userData.email})
        if (foundUser){
            return res.redirect('/login')
        } else {
            let salt = await bcrypt.genSalt(12)
            console.log(salt)
            let hash = await bcrypt.hash(userData.password, salt)
            console.log(hash)
            userData.password = hash;
            const newUser = await db.User.create(userData)
            return res.redirect ('/login')
        }
    } catch (err){
        console.log (err);
        req.error = error
        next ();
    }
});


router.get('/logout', async (req, res) =>{
    try{
        await req.session.destroy();
        return res.redirect ('/login')
    } catch (err){
        console.log(err)
        return res.send (err)
    }
});


module.exports = router
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


















module.exports = router;
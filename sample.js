const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { db } = require("../models/User");
//register routes
router.get("/register", function (req, res) {
    return res.render("pages/auth/register");
  });
router.post('/register', async (req, res, next) => {
  try{
      const doesExist = await User.exists({username: req.body.username});
      if(doesExist){
          return res.redirect('/auth/login')
      }
      const salt = await bcrypt.genSalt(parseInt(process.env.SALTNUM));
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
      const newUser = await User.create(req.body);
      return res.redirect('/auth/login')
  }
  catch(err) {
      console.log(err);
      req.error = err;
      return res.send(err);
  }
})
// login routes
router.get("/login", function (req, res) {
  res.render("pages/auth/login");
});
router.post('/login', async (req,res,next) => {
    try{
        const checkUser = await User.findOne({ username: req.body.username });
        //console.log(checkUser);
        if (!checkUser){
            return res.redirect('/auth/register');
        }
        const match = await bcrypt.compare(req.body.password, checkUser.password);
        if (!match){return res.send('One of those is wrong')};
        req.session.currentUser = {
            id: checkUser._id,
            username: checkUser.username,
        }
        return res.redirect('/home')
    }
    catch(err){
        console.log(err);
        req.error = err;
        return res.send(err);
    }
})
router.get('/logout', async (req, res, next) => {
    try{
        await req.session.destroy();
        return res.redirect('/home')
    }
    catch(err){
        console.log(err);
        req.error = err;
        return res.send(err);
    }
})
module.exports = router;

let doesExist = await User.exists({username: req.session.currentUser});
if(doesExist){
    <p>Welcome <%=req.session.currentUser%></p>

}










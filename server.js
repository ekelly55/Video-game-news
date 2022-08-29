const express = require('express');


//need to set up DB connection
require('./config/db.connections')


const gamesController = require('./controllers/game_controller')


//app configuration
const app = express()
const PORT = 4000
app.set('view engine', 'ejs')


//Middleware for each request
app.use('/games', gamesController)


//404 error route
app.get('*', (req, res) =>{
    res.render('404')
})

//server
app.listen(4000, () => console.log('starting server at port:', PORT))
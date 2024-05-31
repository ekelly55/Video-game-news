import express from "express"
import session from "express-session"
import mongoose from "mongoose"
import commentsRouter from "./comments/comments.routes"
import gamesRouter from "./games/games.routes"
import userRouter from "./users/users.routes"
import {connectDB} from "./config/database"


const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

//mount routers

app.use('/games', gamesRouter)
app.use('/', userRouter)
app.use('/games', commentsRouter)

//view engine
app.set('view engine', 'ejs');


//connect to MongoDB

connectDB()
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Database connection error:", error)
    })

    export default app
import express from "express"
import commentsRouter from "./comments/comments.routes"
import gamesRouter from "./games/games.routes"
import userRouter from "./users/users.routes"


const app = express()

const router = express.Router()

//mount other routers

router.use('/games', gamesRouter)
router.use('/', userRouter)
router.use('/games', commentsRouter)
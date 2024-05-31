import * as express from "express";
import { Request, Response, NextFunction } from "express"
import * as bcrypt from 'bcryptjs'
import User from "./users.interface";
import { IUser } from "./users.interface";
import UserRepository from "./users.repository";
import session from 'express-session'
import * as dotenv from 'dotenv'

dotenv.config()

const userRouter = express.Router()

const userRepo = new UserRepository

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended: false}))



//extend session data to include user data
declare module 'express-session' {
    interface SessionData {
        user: {id: string, username: string};
    }
}

function isError(error: unknown): error is Error{
    return error instanceof Error;
}

//GET /login

userRouter.get('/login', (req: Request, res: Response) => {
    res.render('login.ejs')
})

// GET /register
userRouter.get('/register', (req: Request, res: Response) => {
    res.render('register.ejs');
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body
        const foundUser = await userRepo.loginUser(username, password)
        if(!foundUser){
            return res.status(401).json({message: "Invalid username or password"});
        }    
        req.session.user = {id: foundUser._id.toString(), username: foundUser.username}
        res.status(200).json(foundUser)
    } catch(err) {
        console.error(err);
        next(err);
    }
});

// POST /register
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body as IUser;
        const newUser = await userRepo.registerUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        if(isError(error) && error.message === 'User already exists'){
            res.status(409).redirect('login');
        } else {
            console.log(error);
            next(error)
        }
    }
});

// GET /logout
userRouter.get('/logout', async (req: Request, res: Response) => {
    try {
        await userRepo.logoutUser(req);
        res.status(200).json({message: "Logged out successfully"})
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
});

export default userRouter;
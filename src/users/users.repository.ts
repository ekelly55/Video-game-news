import * as express from "express";
import { Request, Response, NextFunction } from "express"
import * as bcrypt from 'bcryptjs'
import User from "./users.interface";
import { IUser } from "./users.interface";
import session from 'express-session'

// extend the 'express' namespace to include the 'session' property
declare module 'express' {
    interface Request {
        session: session; 
    }
}

const userRouter = express.Router()

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended: false}))

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
        const userData = req.body as {username: string, password: string};
        const foundUser = await User.findOne({usuername: userData.username});
        if(!foundUser){
            return res.redirect('/register');
        } else {
            const match = await bcrypt.compare(userData.password, foundUser.password);
            if(!match) return res.send('Email or password are incorrect');
            req.session.currentUser = {
                id: foundUser._id,
                username: foundUser.username,
            };
            return res.redirect('/games');
        }
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// POST /register
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body as IUser;
        const foundUser = await User.exists({ email: userData.email });
        if (foundUser) {
            return res.redirect('/login');
        } else {
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(userData.password, salt);
            userData.password = hash;
            const newUser = await User.create(userData);
            return res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// GET /logout
userRouter.get('/logout', async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.redirect('/login');
        });
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
});

export default userRouter;
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const users_repository_1 = __importDefault(require("./users.repository"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userRouter = express.Router();
const userRepo = new users_repository_1.default;
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));
function isError(error) {
    return error instanceof Error;
}
//GET /login
userRouter.get('/login', (req, res) => {
    res.render('login.ejs');
});
// GET /register
userRouter.get('/register', (req, res) => {
    res.render('register.ejs');
});
userRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const foundUser = await userRepo.loginUser(username, password);
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        req.session.user = { id: foundUser._id.toString(), username: foundUser.username };
        res.status(200).json(foundUser);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
// POST /register
userRouter.post('/register', async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await userRepo.registerUser(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        if (isError(error) && error.message === 'User already exists') {
            res.status(409).redirect('login');
        }
        else {
            console.log(error);
            next(error);
        }
    }
});
// GET /logout
userRouter.get('/logout', async (req, res) => {
    try {
        await userRepo.logoutUser(req);
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        console.error(err);
        return res.send(err);
    }
});
exports.default = userRouter;

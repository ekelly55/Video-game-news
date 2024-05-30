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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bcrypt = __importStar(require("bcryptjs"));
const users_interface_1 = __importDefault(require("./users.interface"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));
//configure session middleware
userRouter.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
//GET /login
userRouter.get('/login', (req, res) => {
    res.render('login.ejs');
});
// GET /register
userRouter.get('/register', (req, res) => {
    res.render('register.ejs');
});
userRouter.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const foundUser = yield users_interface_1.default.findOne({ usuername: userData.username });
        if (!foundUser) {
            return res.redirect('/register');
        }
        else {
            const match = yield bcrypt.compare(userData.password, foundUser.password);
            if (!match)
                return res.send('Email or password are incorrect');
            req.session.user = {
                id: foundUser._id.toString(),
                username: foundUser.username,
            };
            return res.redirect('/games');
        }
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
// POST /register
userRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const foundUser = yield users_interface_1.default.exists({ email: userData.email });
        if (foundUser) {
            return res.redirect('/login');
        }
        else {
            const salt = yield bcrypt.genSalt(12);
            const hash = yield bcrypt.hash(userData.password, salt);
            userData.password = hash;
            const newUser = yield users_interface_1.default.create(userData);
            return res.redirect('/login');
        }
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
// GET /logout
userRouter.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.redirect('/login');
        });
    }
    catch (err) {
        console.error(err);
        return res.send(err);
    }
}));
exports.default = userRouter;

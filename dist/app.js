"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const comments_routes_1 = __importDefault(require("./comments/comments.routes"));
const games_routes_1 = __importDefault(require("./games/games.routes"));
const users_routes_1 = __importDefault(require("./users/users.routes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//configure session middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
//mount routers
app.use('/games', games_routes_1.default);
app.use('/', users_routes_1.default);
app.use('/games', comments_routes_1.default);
//view engine
app.set('view engine', 'ejs');
//connect to MongoDB
(0, database_1.connectDB)()
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection error:", error);
});
exports.default = app;

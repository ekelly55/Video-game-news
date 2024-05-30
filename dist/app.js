"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_routes_1 = __importDefault(require("./comments/comments.routes"));
const games_routes_1 = __importDefault(require("./games/games.routes"));
const users_routes_1 = __importDefault(require("./users/users.routes"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
//mount other routers
router.use('/games', games_routes_1.default);
router.use('/', users_routes_1.default);
router.use('/games', comments_routes_1.default);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_interface_1 = __importDefault(require("./users.interface"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepository {
    async registerUser(userData) {
        try {
            const foundUser = await users_interface_1.default.exists({ email: userData.email });
            if (foundUser) {
                throw new Error("User already exists");
            }
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(userData.password, salt);
            const newUser = await users_interface_1.default.create({ ...userData, password: hashedPassword });
            return newUser;
        }
        catch (error) {
            throw new Error(`Error creating account: ${error}`);
        }
    }
    async loginUser(username, password) {
        try {
            const foundUser = await users_interface_1.default.findOne({ username });
            if (!foundUser) {
                return null;
            }
            const isMatch = await bcryptjs_1.default.compare(password, foundUser.password);
            if (!isMatch) {
                return null;
            }
            return foundUser;
        }
        catch (error) {
            throw new Error(`Error: username or password incorrect ${error}`);
        }
    }
    async logoutUser(req) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    throw new Error(`Error logging out: ${err}`);
                }
            });
        }
        catch (error) {
            throw new Error(`Error logging out: ${error}`);
        }
    }
}
exports.default = UserRepository;

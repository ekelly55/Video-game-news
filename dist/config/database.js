"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
    throw new Error("Please define the MongoDB environment variable inside .env");
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;

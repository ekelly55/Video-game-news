import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, '../../.env')});

const {MONGODB_URI} = process.env;

if(!MONGODB_URI) {
    throw new Error("Please define the MongoDB environment variable inside .env")

}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("MongoDB connected successfully")
    } catch(error){
        console.log("Error connecting to MongoDB", error)
        process.exit(1)
    }
};

export {connectDB}
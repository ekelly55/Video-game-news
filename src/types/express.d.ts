import express from "express";

//have to also set tsconfig to include custom types

declare global {
    namespace Express {
        interface Request {
            currentUser?: { id: string, username: string}
        }
    }
}
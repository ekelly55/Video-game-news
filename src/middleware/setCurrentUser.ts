import { Request, Response, NextFunction } from "express";

export const setCurrentUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.user){
        //be sure to modify express request object to add currentUser property
        req.currentUser = req.session.user
    }
    next();
};
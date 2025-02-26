
import { Request, Response, NextFunction } from "express";
import { jwtDecode } from "jwt-decode";
import User from "../models/user.model";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined = undefined;
    try{
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
             res.status(401).json({
                status: 401,
                message: "You are not logged in. Please login to continue.",
            });
        }
        const decoded: any = await jwtDecode(token as string);
        const loggedUser: any = await User.findOne({username:decoded.username});
        if (!loggedUser) {
             res.status(401).json({
                status: 401,
                message: "Please login to continue",
            });
        }else{
            // @ts-ignore
            req.user = loggedUser;
            next();
        }
    } catch (error: any) {
         res.status(401).json({
            status: "failed",
            error: error.message + " Token has expired. Please login again.",
        });
    }
} 
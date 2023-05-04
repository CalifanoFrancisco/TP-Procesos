import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from "dotenv"

dotenv.config();

const SECRET_KEY = "wesexin";


export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const authorize = async(req:Request, res:Response) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error("Error de autorizacion de JWT");
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

    } catch (err) {
        res.status(401).send('Porfis autentifiqse');
    }
}
import { Request, Response, NextFunction  } from 'express'
import jwt from "jsonwebtoken"

export const SECRET_KEY = "llave-secreta-jeje-uwu";

export async function auth(req:Request, res:Response, next:NextFunction) {

    const token = req.headers['authorization'];

    try {
        if (!token) throw new Error();
        
        const decoded = jwt.verify(token, SECRET_KEY);  
        
        next();

    } catch (err) {
        res.status(401).send('No autorizado o pusiste las cosas mal pelotudo');
    }
};

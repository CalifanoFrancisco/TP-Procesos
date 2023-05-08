import jwt,     { Secret, JwtPayload } from 'jsonwebtoken'
import express, { Request, Response, NextFunction  } from 'express'
import { Usuario } from '../types/Usuario';

export const SECRET_KEY:Secret = "llave-secreta-jeje-uwu";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export async function auth(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.header('Autorization')?.replace('Bearer ', '');
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic29uUm9ib3RzIiwicGFzc3dvcmQiOiJzb25Sb2JvdHMiLCJzYWx0IjowLCJpYXQiOjE2ODM1NzIxMzEsImV4cCI6MTY4Mzc0NDkzMX0.x9R4YtFjxyXnrDhzc8oDbR-18pD1UIy3ws_7aebRqEk"

        if (!token) throw new Error();

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        console.log(decoded);        
        next();

    } catch (err) {
        res.status(401).send('No autorizado o pusiste las cosas mal pelotudo');
    }
};

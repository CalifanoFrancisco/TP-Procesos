import express, { Request, Response } from "express"
import { Usuario } from "../types/Usuario"
import { UsuarioModel } from "../models/UsuarioModel";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

dotenv.config();

const UsuarioRouter = express.Router();

UsuarioRouter.post("/register", async(req:Request, res:Response) => {
    const newUsuario: Usuario = req.body;
    UsuarioModel.register(newUsuario)
        .then(  id => res.status(200).json({"id":id}))
        .catch(err => res.send(500).json({"message": err.message}))
    ;
});

UsuarioRouter.post("/login", async(req:Request, res:Response) => {
    const user: Usuario = req.body;
    UsuarioModel.login(user)
        .then(stat => res.status(200).json({"logeado exitosamente?": stat}))
        .catch(err => res.send(403).json({"message": err.message}));

        
});

UsuarioRouter.get("/", async(req:Request, res:Response) => {
    UsuarioModel.findAll()
        .then((users) => res.status(200).json({"data": users}))
        .catch( (err) => res.send(500).json({"message": err.message}))
    ;
});

export { UsuarioRouter };

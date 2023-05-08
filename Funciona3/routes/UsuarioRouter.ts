import express, { Request, Response } from "express"
import { UsuarioModel } from "../models/UsuarioModel";
import { Usuario }      from "../types/Usuario"
import * as dotenv      from "dotenv";
import { auth } from "../middleware/auth";

dotenv.config();

const UsuarioRouter = express.Router();

UsuarioRouter.post("/register", async(req:Request, res:Response) => {
    const newUsuario: Usuario = req.body;
    UsuarioModel.register(newUsuario)
        .then(  id => res.status(200).json({"id":id}))
        .catch(err => res.status(403).send("Este usuario ya existe").json({"message": err.message}))
    ;
});

UsuarioRouter.post("/login", async(req:Request, res:Response) => {
    const user: Usuario = req.body;
    UsuarioModel.login(user)
        .then(token => {
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(200).json({"token": token});
        })
        .catch( err => res.send(403).json({"message": err.message}))
    ;
});

UsuarioRouter.get("/", auth, async(req:Request, res:Response) => {
    UsuarioModel.findAll()
        .then((users) => res.status(200).json({"data": users}))
        .catch( (err) => res.send(500).json({"message": err.message}))
    ;
});

UsuarioRouter.get("/holamundo", auth, async(req:Request, res:Response) => {
    res.status(200).json({"finka": "ono"});
});

export { UsuarioRouter };

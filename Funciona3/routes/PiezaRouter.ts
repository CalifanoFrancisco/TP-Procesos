import express, { Request, Response } from "express"
import { PiezaModel } from "../models/PiezaModel";
import { Pieza } from "../types/Pieza";
import { auth } from "../middleware/auth";

const PiezaRouter = express.Router();

PiezaRouter.get("/", auth, async (req:Request, res:Response) => {
    PiezaModel.findAll()
        .then((piezas) => res.status(200).json({"data": piezas}))
        .catch(  (err) => res.send(500)  .json({"message": err.message}))
    ;
});
PiezaRouter.get("/:id", auth, async(req:Request, res:Response) => {
    const piezaId: Number = Number(req.params.id);
    PiezaModel.findOne(piezaId)
        .then((pieza) => res.status(200).json({"data": pieza}))
        .catch( (err) => res.send(500)  .json({"message": err.message})) 
    ;
});

PiezaRouter.post("/", auth, async(req:Request, res:Response) => {
    const newPieza: Pieza = req.body;
    PiezaModel.create(newPieza)
        .then((pieza_id) => res.status(200).json({"data": pieza_id}))
        .catch(    (err) => res.send(500)  .json({"message": err.message}))
    ;
});

PiezaRouter.patch("/", auth, async(req:Request, res:Response) => {
    const pieza: Pieza = req.body;
    PiezaModel.update(pieza)
        .then((stat) => res.status(200).json({}))
        .catch((err) => res.send(500).json({"message": err.message}))
    ;
});

PiezaRouter.delete("/:id", auth, async(req:Request, res:Response) => {
    const piezaID: Number = Number(req.params.id);
    PiezaModel.drop(piezaID)
        .then((stat) => res.status(200).json({}))
        .catch((err) => res.send(500).json({"message": err.message}))
    ;
});

PiezaRouter.get("/:id/componentes", auth, async (req:Request, res:Response) => {
    const piezaId: Number = Number(req.params.id);
    PiezaModel.getComponents(piezaId)
        .then((componentes) => res.status(200).json({"data": componentes}))
        .catch(       (err) => res.send(500).json({"message": err.message}))
    ;
});

PiezaRouter.post("/:id/componentes/:id_componente", auth, async(req:Request, res:Response) => {
    const piezaID:Number      = Number(req.params.id);
    const componenteID:Number = Number(req.params.id_componente);
    PiezaModel.addComponent(piezaID, componenteID)
        .then((stat) => res.status(200).json({}))
        .catch((err) => res.send(500).json({"message": err.message}))
    ;
});

PiezaRouter.delete("/:id/componentes/:id_componente", auth, async(req:Request, res:Response) => {
    const piezaID:Number      = Number(req.params.id);
    const componenteID:Number = Number(req.params.id_componente);
    PiezaModel.dropComponent(piezaID, componenteID)
        .then((stat) => res.status(200).json({}))
        .catch((err) => res.send(500).json({"message": err.message})) 
    ;
});

PiezaRouter.propfind("/ids", auth, async(req:Request, res:Response) => {
    PiezaModel.getIDs()
        .then( (ids) => res.status(200).json({"data": ids}))
        .catch((err) => res.send(500).json({"message": err.message}))
    ;
});

export { PiezaRouter };




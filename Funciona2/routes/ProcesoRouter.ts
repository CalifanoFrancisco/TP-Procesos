import express, { Request, Response } from "express"
import { ProcesoModel } from "../models/ProcesoModel";
import { Proceso } from "../types/Proceso";

const ProcesoRouter = express.Router();

ProcesoRouter.get("/", async (req:Request, res:Response) => {
    ProcesoModel.findAll()
        .then((procesos) => res.status(200).json({"data": procesos}))
        .catch(    (err) => res.send(500).json({"message": err.message}))
    ;
});

ProcesoRouter.get("/:id", async (req:Request, res:Response) => {
    const procesoID: Number =  Number(req.params.id);
    ProcesoModel.findOne(procesoID)
        .then((proceso) => res.status(200).json({"data": proceso}))
        .catch(   (err) => res.send(500).json({"message": err.message}))
    ;
});
ProcesoRouter.post("/", async (req:Request, res:Response) => {
    const proceso:Proceso = req.body;
    ProcesoModel.create(proceso) 
        .then((procesoID) => res.status(200).json({"ProcesoID": procesoID}))
        .catch(     (err) => res.send(500).json({"message": err.message}))
    ;
});
ProcesoRouter.delete("/:id", async (req:Request, res:Response) => {
    const procesoID:Number = Number(req.params.id);
    ProcesoModel.drop(procesoID)
        .then(   (n) => res.status(200).json({}))
        .catch((err) => res.send(500).json({"message": err.message}))
    ;
});
ProcesoRouter.get("/:id/piezasEntrada", async (req:Request, res:Response) => {
    const procesoID:Number = Number(req.params.id);
    ProcesoModel.getEntryPieces(procesoID)
        .then((piezas) => res.status(200).json({"data": piezas}))
        .catch(  (err) => res.send(500).json({"message": err.message}))
    ;
});
ProcesoRouter.get("/:id/piezasSalida", async (req:Request, res:Response) => {
    const procesoID:Number = Number(req.params.id);
    ProcesoModel.getByOutputPiece(procesoID)
        .then((pieza) => res.status(200).json({"data": pieza}))
        .catch( (err) => res.send(500).json({"message": err.message}))
    ;
});
ProcesoRouter.propfind("/ids", async (req:Request, res:Response) => {
    ProcesoModel.getIDs()
        .then((ids) => res.status(200).json({"data":ids}))
        .catch((err) => res.send(500).json({"message": err.message}))
    ;
});

export { ProcesoRouter };
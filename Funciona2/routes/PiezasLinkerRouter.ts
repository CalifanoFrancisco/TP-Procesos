import express, { Request, Response } from "express"
import { PiezasLinkerModel } from "../models/PiezasLinkerModel"
import { PiezaLink } from "../types/PiezaLink"

const PiezasLinkerRouter = express.Router();

PiezasLinkerRouter.get("/", async(req:Request, res:Response) => {
    PiezasLinkerModel.findAll()
        .then((piezasLinker) => res.status(200).json({"data": piezasLinker}))
        .catch(        (err) => res.send(500).json({"message": err.message}))
    ;
});

PiezasLinkerRouter.get("/:id", async(req:Request, res:Response) => {
    const PiezaLinkerID:Number = Number(req.params.id);
    PiezasLinkerModel.findOne(PiezaLinkerID)
        .then((piezaLinker) => res.status(200).json({"data": piezaLinker}))
        .catch(        (err) => res.send(500).json({"message": err.message}))
    ;
});

export { PiezasLinkerRouter}
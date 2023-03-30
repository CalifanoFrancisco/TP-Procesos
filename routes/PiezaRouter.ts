import express, {Request, Response} from "express"
import * as PiezaModel              from "../models/Pieza";
import { Pieza }                    from "../types/Pieza";

const PiezaRouter = express.Router();

PiezaRouter.get("/", async(req: Request, res: Response) => {
    PiezaModel.findAll((err: Error, piezas: Pieza[]) => {
        if (err) return res.status(500).json({"errorMessage": err.message});
        res.status(200).json({"data": piezas});
    })       
});

PiezaRouter.get("/:id", async(req: Request, res: Response) => {
    const piezaId: Number = Number(req.params.id);
    PiezaModel.findOne(
        piezaId,
        (err: Error, pieza: Pieza) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": pieza});
        }
    );
});

PiezaRouter.post("/", async(req: Request, res: Response) => {
    const newPieza: Pieza = req.body;
    PiezaModel.create(
        newPieza,
        (err: Error, pieza_id: Number) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"pieza_id": pieza_id});
        }
    );
});

PiezaRouter.patch("/", async(req: Request, res: Response) => {
    const pieza: Pieza = req.body;
    PiezaModel.update(
        pieza, 
        (err: Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});



export { PiezaRouter };
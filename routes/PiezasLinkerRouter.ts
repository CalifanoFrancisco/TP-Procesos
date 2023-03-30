import express, {Request, Response} from "express"
import * as PiezasLinkerModel       from "../models/PiezasLinker";
import { PiezasLinker }             from "../types/PiezasLinker";

const PiezasLinkerRouter = express.Router();

PiezasLinkerRouter.get("/", async(req: Request, res: Response) => {
    PiezasLinkerModel.findAll((err: Error, piezasLinker: PiezasLinker[]) => {
        if (err) return res.status(500).json({"errorMessage": err.message});
        res.status(200).json({"data": piezasLinker});
    })       
});

PiezasLinkerRouter.get("/:id", async(req: Request, res: Response) => {
    const piezaId: Number = Number(req.params.id);
    PiezasLinkerModel.findOne(
        piezaId,
        (err: Error, piezaLinker: PiezasLinker) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": piezaLinker});
        }
    );
});

PiezasLinkerRouter.post("/", async(req: Request, res: Response) => {
    const newPieza: PiezasLinker = req.body;
    PiezasLinkerModel.create(
        newPieza,
        (err: Error, pieza_id: Number) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"status": "added succesfully!"});
        }
    );
});

PiezasLinkerRouter.patch("/", async(req: Request, res: Response) => {
    const pieza: PiezasLinker = req.body;
    PiezasLinkerModel.update(
        pieza, 
        (err: Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

export { PiezasLinkerRouter };

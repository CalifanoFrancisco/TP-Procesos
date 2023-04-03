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
    const piezaLinkerId: Number = Number(req.params.id);
    PiezasLinkerModel.findOne(
        piezaLinkerId,
        (err: Error, piezaLinker: PiezasLinker) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": piezaLinker});
        }
    );
});

PiezasLinkerRouter.post("/", async(req: Request, res: Response) => {
    const newPiezaLinker: PiezasLinker = req.body;
    PiezasLinkerModel.create(
        newPiezaLinker,
        (err: Error, pieza_id: Number) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"status": "added succesfully!"});
        }
    );
});

PiezasLinkerRouter.patch("/", async(req: Request, res: Response) => {
    const piezaLinker: PiezasLinker = req.body;
    PiezasLinkerModel.update(
        piezaLinker, 
        (err: Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

PiezasLinkerRouter.delete("/:id", async(req: Request, res:Response) => {
    const piezaLinkerId: Number = Number(req.params.id);
    PiezasLinkerModel.drop(
        piezaLinkerId,
        (err:Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

export { PiezasLinkerRouter };

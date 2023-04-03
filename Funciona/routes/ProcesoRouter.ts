import express, {Request, Response} from "express"
import * as ProcesoModel            from "../models/Proceso";
import { Proceso }                  from "../types/Proceso";
import { Pieza }                    from "../types/Pieza";

const ProcesoRouter = express.Router();

//get all Procesos
ProcesoRouter.get("/", async (req: Request, res: Response) => {
    ProcesoModel.findAll(
        (err: Error, procesos: Proceso[]) => {
            if (err) return res.status(500).json({"errorMessage": err.message});
            res.status(200).json({"data": procesos});
        }
    );
});

//get Proceso by id
ProcesoRouter.get("/:id", async (req: Request, res: Response) => {
    const procesoID: Number = Number(req.params.id);
    ProcesoModel.findOne(
        procesoID,
        (err: Error, pieza: Proceso) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": pieza});
        }
    );
});

//create new Proceso
ProcesoRouter.post("/", async (req: Request, res: Response) => {
    const newProceso: Proceso = req.body;
    ProcesoModel.create(
        newProceso,
        (err: Error, proceso_id: Number) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"proceso_id": proceso_id});
        }
    );
});

//edit Proceso by id
ProcesoRouter.patch("/", async (req: Request, res: Response) => {
    const proceso: Proceso = req.body;
    ProcesoModel.update(
        proceso, 
        (err: Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

//delete Proceso by id
ProcesoRouter.delete("/:id", async (req: Request, res: Response) => {
    const procesoID: Number = Number(req.params.id);
    ProcesoModel.drop(
        procesoID,
        (err: Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

//get piezas de entrada de un proceso
ProcesoRouter.get("/:id/piezasEntrada", async(req:Request, res:Response) => {
    const procesoID: Number = Number(req.params.id);
    ProcesoModel.getEntryPieces(
        procesoID,
        (err:Error, piezas: Pieza[]) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": piezas});
        }
    );
});

//get pieza de salida de un proceso
ProcesoRouter.get("/:id/piezaSalida", async(req:Request, res:Response) => {
    const procesoID: Number = Number(req.params.id);
    ProcesoModel.getByOutputPiece(
        procesoID,
        (err:Error, pieza:Pieza) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": pieza});
        }
    );
});

// get all valid Procesos id
ProcesoRouter.propfind("/ids", async(req:Request, res:Response) => {
    ProcesoModel.getIDs(
        (err:Error, ids:Number[]) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"IDs": ids});
        }
    );
    //return true;
});

export { ProcesoRouter };

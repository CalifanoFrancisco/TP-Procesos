import express, {Request, Response} from "express"
import * as PiezaModel              from "../models/Pieza";
import { Pieza }                    from "../types/Pieza";

const PiezaRouter = express.Router();

//get all Piezas
PiezaRouter.get("/", async(req: Request, res: Response) => {
    PiezaModel.findAll((err: Error, piezas: Pieza[]) => {
        if (err) return res.status(500).json({"errorMessage": err.message});
        res.status(200).json({"data": piezas});
    })       
});

//get Pieza by index
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

//create new Pieza
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

//edit Pieza
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

//delete Pieza
PiezaRouter.delete("/:id", async(req:Request, res:Response) => {
    const piezaId: Number = Number(req.params.id);
    PiezaModel.drop(
        piezaId,
        (err:Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

//get Piezas of Pieza
PiezaRouter.get("/:id/componentes",async (req:Request, res:Response) => {
    const piezaId: Number = Number(req.params.id);
    PiezaModel.getComponents(
        piezaId,
        (err:Error, piezas:Pieza[]) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"data": piezas});
        }
    )
})

//add Pieza(component) to Pieza(main)
PiezaRouter.post("/:id_pieza/componentes/:id_componente",async (req:Request, res:Response) => {
    const id_pieza: Number = Number(req.params.id_pieza);
    const id_comp:  Number = Number(req.params.id_componente);

    PiezaModel.addComponent(
        id_comp,
        id_pieza,
        (err:Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    );
});

//delete Pieza(component) from Pieza(main)
PiezaRouter.delete("/:id_pieza/componentes/:id_componente", async (req:Request, res:Response) => {
    const id_pieza: Number = Number(req.params.id_pieza);
    const id_comp:  Number = Number(req.params.id_componente);

    PiezaModel.dropComponent(
        id_comp,
        id_pieza,
        (err: Error) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).send();
        }
    )
});

//get all valid Piezas ID
PiezaRouter.propfind("/ids", async(req:Request,res:Response) => {
    PiezaModel.getIDs(
        (err:Error, ids:Number[]) => {
            if (err) return res.status(500).json({"message": err.message});
            res.status(200).json({"IDs": ids});
        }
    );
});     

export { PiezaRouter };
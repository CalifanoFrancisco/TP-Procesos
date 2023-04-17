import { Proceso }                 from "../types/Proceso";
import { Pieza }                   from "../types/Pieza";
import { db }                      from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export class ProcesoModel {
    public static create(proceso:Proceso): Promise<Number> {
        const queryString = "INSERT INTO Procesos (id_pieza_salida, tipo) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [proceso.id_pieza_salida, proceso.tipo],
                (err, res) => {
                    if (err) reject(err);
                    const insertID = (<OkPacket> res).insertId;
                    resolve(insertID);
                }
            )
        })
    }
    public static findOne(id:Number): Promise<Proceso> {
        const queryString = "SELECT * FROM Procesos WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    const proceso = new Proceso(row.id, row.id_pieza_salida, row.tipo);
                    resolve(proceso);
                }
            )
        })
    }
    public static findAll(): Promise<Proceso[]> {
        const queryString = "SELECT * FROM Procesos";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {
                    if (err) reject(err);
                    const rows = <RowDataPacket[]> res;
                    const procesos: Proceso[] = [];
                    rows.forEach(row => {
                        const proceso = new Proceso(row.id, row.id_pieza_salida, row.tipo);
                        procesos.push(proceso);
                    });
                    resolve(procesos);
                }
            );
        });
    }
    public static update(proceso:Proceso): Promise<number> {
        const queryString = "UPDATE Procesos SET id_pieza_salida = ?, tipo = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [proceso.id_pieza_salida, proceso.tipo, proceso.id],
                (err, res) => {
                    if (err) reject(err);
                    resolve(200);
                }
            );
        });
    }
    public static drop(id:Number): Promise<number> {
        const queryString = "DELETE FROM Procesos WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    resolve(200);
                }
            );
        });
    }
    public static getByOutputPiece(id:Number): Promise<Pieza> {
        const queryString = 
        "SELECT * FROM Piezas WHERE id = (" +
            "SELECT id_pieza_salida FROM Procesos WHERE id = ?" +
        ")";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    const pieza: Pieza = new Pieza(row.id, row.material, row.peso)
                    resolve(pieza);
                }
            );
        });
    }
    public static getEntryPieces(id:Number): Promise<Pieza[]> {
        const queryString = 
        "SELECT * FROM Piezas WHERE id IN (" + 
            "SELECT id_componente FROM PiezasLinker WHERE id_pieza = (" + 
                "SELECT id_pieza_salida FROM Procesos WHERE id = ?" +
            ")" +
        ")";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    const rows = <RowDataPacket[]> res;
                    const piezas: Pieza[] = [];
                    rows.forEach(row => {
                        const pieza: Pieza = new Pieza(row.id, row.material, row.peso)
                        piezas.push(pieza);
                    });
                    resolve(piezas);
                }
            );
        });
    }
    public static getIDs(): Promise<Number[]> {
        const queryString = "SELECT * FROM Procesos ";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {
                    if (err) reject(err);
                    const rows = <RowDataPacket[]> res;
                    const ids: Number[] = [];
                    rows.forEach(row => {
                        const id:Number = row.id;
                        ids.push(id);
                    });
                    resolve(ids);
                }
            );
        });
    }
}
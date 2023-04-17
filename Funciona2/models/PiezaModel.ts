import { OkPacket, RowDataPacket } from "mysql2";
import { Pieza } from "../types/Pieza";
import { db }    from "../db";

export class PiezaModel {
    public static create (pieza:Pieza):Promise<Number> { 
        const queryString = "INSERT INTO Piezas (material, peso) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [pieza.material, pieza.peso],
                (err, res) => {
                    if (err) reject(err);
                    const insertid = (<OkPacket> res).insertId;
                    resolve(insertid);
                }
            );
        });
    }
    public static findOne(id:Number):Promise<Pieza> {
        const queryString = "SELECT * FROM Piezas WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    const pieza: Pieza = new Pieza(row.id, row.material, row.peso);
                    resolve(pieza);
                }
            );
        });
    }
    public static findAll():Promise<Pieza[]>{
        const queryString = "SELECT * FROM Piezas";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
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
            )
        });
        
    }
    public static update(pieza:Pieza):Promise<Number> {
        const queryString = "UPDATE Piezas SET material = ?, peso = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [pieza.material, pieza.peso, pieza.id],
                (err, res) => {
                    if (err) reject(err);
                    resolve(200);
                }
            );
        });
    }
    public static drop   (id:Number):Promise<Number> {
        const queryString = "DELETE FROM Piezas WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    resolve(200);
                }
            )
        });
    }
    public static getComponents(id:Number):Promise<Pieza[]> {
        const queryString = "SELECT * FROM Piezas WHERE id IN (SELECT id_componente FROM PiezasLinker WHERE id_pieza = ?)";
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
    public static addComponent (id_pieza:Number, id_componente:Number):Promise<Number> {
        const queryString = 
        "INSERT INTO PiezasLinker (id_pieza, id_componente) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id_componente, id_pieza],
                (err, res) => {
                    if (err) reject(err);
                    resolve(200);
                }
            );
        });
    }
    public static dropComponent(id_pieza:Number, id_componente:Number):Promise<Number> {
        const queryString = "DELETE FROM PiezasLinker WHERE id_componente = ? AND id_pieza = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id_componente, id_pieza],
                (err, res) => {
                    if (err) reject(err);
                    resolve(1)
                }
            )
        });
    }
    public static getIDs():Promise<Number[]> {
        const queryString ="SELECT*FROM Piezas";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                (err, res) => {
                    if (err) reject(err);
                    const rows =  <RowDataPacket[]> res;
                    const ids:Number[] = [];
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
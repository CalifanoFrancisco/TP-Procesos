import { Pieza }                   from "../types/Pieza";
import { db }                      from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create=(pieza: Pieza, callBack: Function) => {
    
    const queryString = "INSERT INTO Piezas (material, peso) VALUES (?, ?)";

    db.query(
        queryString,
        [pieza.material, pieza.peso],
        (err, result) => {
            if (err) callBack(err);
            const insertId = (<OkPacket> result).insertId;
            callBack(null, insertId);
        }
    );
}

export const findOne=(id_pieza: Number, callBack: Function) => {
    const queryString = "SELECT * FROM Piezas WHERE id = ?";
    db.query(
        queryString,
        [id_pieza],
        (err, result) => {
            if (err) callBack(err);

            const row = (<RowDataPacket> result)[0];
            const pieza: Pieza = new Pieza(row.id, row.material, row.peso)
            callBack(null, pieza);
        }
    );
}

export const findAll=(callback: Function) => {
    const queryString = "SELECT * FROM Piezas";
    db.query(
        queryString,
        (err, result) => {
            if (err) callback(err);

            const rows = <RowDataPacket[]> result;
            const piezas: Pieza[] = [];

            rows.forEach(row => {
                const pieza: Pieza = new Pieza(row.id, row.material, row.peso)
                piezas.push(pieza);
            });
            callback(null, piezas);
        }
    );
}

export const update=(pieza: Pieza, callback: Function) => {
    const queryString = "UPDATE Piezas SET material = ?, peso = ? WHERE id = ?";
    db.query(
        queryString,
        [pieza.material, pieza.peso, pieza.id],
        (err, result) => {
            if (err) callback(err);
            callback(null);
        }
    );
}

export const drop=(id_pieza: Number, callBack: Function) => {
    const queryString = "DELETE FROM Piezas WHERE id = ?";
    db.query(
        queryString,
        [id_pieza],
        (err, result) => {
            if (err) callBack(err);
            callBack(null);
        }
    );
}

export const getComponents=(id_pieza:Number, callBack:Function) => {
    const queryString = 
    "SELECT * FROM Piezas WHERE id IN (SELECT id_componente FROM PiezasLinker WHERE id_pieza = ?)";
    db.query(
        queryString,
        [id_pieza],
        (err, result) => {
            if (err) callBack(err);

            const rows = <RowDataPacket[]> result;
            const piezas: Pieza[] = [];
            rows.forEach(row => {
                const pieza: Pieza = new Pieza(row.id, row.material, row.peso)
                piezas.push(pieza);
            });
            callBack(null, piezas);
        }
    );
}

export const addComponent=(id_componente:Number, id_pieza:Number, callBack:Function) => {
    const queryString = 
    "INSERT INTO PiezasLinker (id_pieza, id_componente) VALUES (?, ?)";
    db.query(
        queryString,
        [id_pieza, id_componente],
        (err, result) => {
            if (err) callBack(err);
            callBack(null);
        }
    );
}

export const dropComponent=(id_componente:Number, id_pieza:Number, callBack:Function) => {
    const queryString = 
    "DELETE FROM PiezasLinker WHERE id_componente = ? AND id_pieza = ?";
    db.query(
      queryString,
      [id_componente, id_pieza],
      (err, result) => {
        if (err) callBack(err);
        callBack(null);
      }
    );
}

export const getIDs=(callback:Function) => {
    const queryString ="SELECT*FROM Piezas";
    db.query(
        queryString,
        (err, result) => {
            if (err) callback(err);
            const rows =  <RowDataPacket[]> result;
            const ids:Number[] = [];

            rows.forEach(row => {
                const id:Number = row.id;
                ids.push(id);
            });
            callback(null, ids);
        }
    );
}
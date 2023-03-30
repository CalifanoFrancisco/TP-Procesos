import { PiezasLinker }            from "../types/PiezasLinker";
import { db }                      from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (pieza_link: PiezasLinker,  callBack: Function) => {
    
    const queryString = "INSERT INTO PiezasLinker (id_pieza, id_componente) VALUES (?, ?)";
    
    db.query(
        queryString,
        [pieza_link.id_pieza, pieza_link.id_componente],
        (err, result) => {
            if (err) callBack(err);
            const insertId = (<OkPacket> result).insertId;
            callBack(null, insertId);
        }
    );
}

export const findOne =(id_pieza:   Number,        callBack: Function) => {
    const queryString = "SELECT * FROM PiezasLinker WHERE id_pieza = ?";
    db.query(
        queryString,
        [id_pieza],
        (err, result) => {
            if (err) callBack(err);

            const row = (<RowDataPacket> result)[0];
            const pieza: PiezasLinker = {
                id_componente: row.id_componente,
                id_pieza:      row.id_pieza,
            };
            callBack(null, pieza);
        }
    );
}

export const findAll =(                           callback: Function) => {
    const queryString = "SELECT * FROM PiezasLinker";
    db.query(
        queryString,
        (err, result) => {
            if (err) callback(err);

            const rows = <RowDataPacket[]> result;
            const piezasLinkers: PiezasLinker[] = [];

            rows.forEach(row => {
                const piezasLinker: PiezasLinker = {
                    id_componente: row.id_componente,
                    id_pieza: row.id_pieza
                };
                piezasLinkers.push(piezasLinker);
            });
            callback(null, piezasLinkers);
        }
    );
}

export const update = (pieza_link: PiezasLinker,  callback: Function) => {
    const queryString = "UPDATE PiezasLinker SET id_componente = ? WHERE id_pieza = ?";
    db.query(
        queryString,
        [pieza_link.id_componente, pieza_link.id_pieza],
        (err, result) => {
            if (err) callback(err);
            callback(null);
        }
    );
}

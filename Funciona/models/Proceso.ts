import { Proceso }                 from "../types/Proceso";
import { Pieza }                   from "../types/Pieza";
import { db }                      from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create=(proceso:    Proceso, callBack: Function) => {
    const queryString = "INSERT INTO Procesos (id_pieza_salida, tipo) VALUES (?, ?)";

    db.query(
        queryString,
        [proceso.id_pieza_salida, proceso.tipo],
        (err, result) => {
            if (err) callBack(err);
            const insertId = (<OkPacket> result).insertId;
            callBack(null, insertId);
        }
    );
}

export const findOne=(id_proceso: Number,  callBack: Function) => {
    
    const queryString = "SELECT * FROM Procesos WHERE id = ?";
    
    db.query(
        queryString,
        [id_proceso],
        (err, result) => {
            if (err) callBack(err);

            const row = (<RowDataPacket> result)[0];

            const proceso: Proceso = {
                id:              row.id,
                id_pieza_salida: row.id_pieza_salida,
                tipo:            row.tipo
            };
            callBack(null, proceso);
        }
    );
}

export const findAll=(                     callback: Function) => {
    const queryString = "SELECT * FROM Procesos";
    db.query(
        queryString,
        (err, result) => {
            if (err) callback(err);

            const rows = <RowDataPacket[]> result;
            const procesos: Proceso[] = [];

            rows.forEach(row => {
                const proceso: Proceso = {
                    id:              row.id,
                    id_pieza_salida: row.id_pieza_salida,
                    tipo:            row.tipo
                };
                procesos.push(proceso);
            });
            callback(null, procesos);
        }
    );
}

export const update=(proceso:    Proceso, callback: Function) => {
    const queryString = "UPDATE Procesos SET id_pieza_salida = ?, tipo = ? WHERE id = ?";
    db.query(
        queryString,
        [proceso.id_pieza_salida, proceso.tipo, proceso.id],
        (err, result) => {
            if (err) callback(err);
            callback(null);
        }
    );
}

export const drop=(id_proceso: Number, callBack: Function) => {
    const queryString = "DELETE FROM Procesos WHERE id = ?";
    db.query(
        queryString,
        [id_proceso],
        (err, result) => {
            if (err) callBack(err);
            callBack(null);
        }
    );
}

export const getByOutputPiece=(id_proceso: Number, callBack:Function) => {
    const queryString = 
    "SELECT * FROM Piezas WHERE id = (" +
        "SELECT id_pieza_salida FROM Procesos WHERE id = ?" +
    ")";
    db.query(
        queryString,
        [id_proceso],
        (err, result) => {
            if (err) callBack(err);

            const row = (<RowDataPacket> result)[0];
            const pieza: Pieza = {
                id:       row.id,
                material: row.material,
                peso:     row.peso
            };

            callBack(null, pieza);
        }
    );
}

export const getEntryPieces=(id_proceso:Number, callback:Function) => {
    const queryString = 
    "SELECT * FROM Piezas WHERE id IN (" + 
        "SELECT id_componente FROM PiezasLinker WHERE id_pieza = (" + 
            "SELECT id_pieza_salida FROM Procesos WHERE id = ?" +
        ")" +
    ")";
    db.query(
        queryString,
        [id_proceso],
        (err, result) => {
            if (err) callback(err);

            const rows = <RowDataPacket[]> result;
            const piezas: Pieza[] = [];

            rows.forEach(row => {
                const pieza: Pieza = {
                    id:       row.id,
                    material: row.material,
                    peso:     row.peso
                };
                piezas.push(pieza);
            });

            callback(null, piezas);
        }
    );
}

export const getIDs=(callback:Function) => {
    const queryString = "SELECT * FROM Procesos ";
    db.query(
        queryString,
        (err, result) => {
            if (err) callback(err);
            const rows = <RowDataPacket[]> result;
            const ids: Number[] = [];

            rows.forEach(row => { 
                const id:Number = row.id; 
                ids.push(id);
            });
            callback(null, ids);
        }
    );
}
import { Proceso }            from "../types/Proceso";
import { db }                      from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (proceso:    Proceso, callBack: Function) => {
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
export const findOne =(id_proceso: Number,  callBack: Function) => {
    
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
export const findAll =(                     callback: Function) => {}
export const update = (proceso:    Proceso, callback: Function) => {}


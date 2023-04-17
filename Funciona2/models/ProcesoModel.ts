import { Proceso }                 from "../types/Proceso";
import { Pieza }                   from "../types/Pieza";
import { db }                      from "../db";
import { OkPacket, RowDataPacket } from "mysql2";



export class ProcesoModel {
    public static create(): Promise<Number> {
        const queryString = "INSERT INTO Procesos (id_pieza_salida, tipo) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

/////////////////////////////////////////////////////////////////////

    public static findOne(): Promise<Proceso> {
        const queryString = "SELECT * FROM Procesos WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

/////////////////////////////////////////////////////////////////////

    public static findAll(): Promise<Proceso[]> {
        const queryString = "SELECT * FROM Procesos";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

////////////////////////////////////////////////////////////////////

    public static update(): Promise<number> {
        const queryString = "UPDATE Procesos SET id_pieza_salida = ?, tipo = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

///////////////////////////////////////////////////////////////////

    public static drop(): Promise<number> {
        const queryString = "DELETE FROM Procesos WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

///////////////////////////////////////////////////////////////////

    public static getByOutputPiece(): Promise<Pieza> {
        const queryString = 
    "SELECT * FROM Piezas WHERE id = (" +
        "SELECT id_pieza_salida FROM Procesos WHERE id = ?" +
    ")";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

///////////////////////////////////////////////////////////////////

    public static getEntryPieces(): Promise<Pieza> {
        const queryString = 
    "SELECT * FROM Piezas WHERE id IN (" + 
        "SELECT id_componente FROM PiezasLinker WHERE id_pieza = (" + 
            "SELECT id_pieza_salida FROM Procesos WHERE id = ?" +
        ")" +
    ")";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

///////////////////////////////////////////////////////////////////

    public static getIDs(): Promise<number> {
        const queryString = "SELECT * FROM Procesos ";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {}
            )
        })
    }

//////////////////////////////////////////////////////////////////
}
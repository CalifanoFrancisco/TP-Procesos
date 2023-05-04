import { OkPacket, RowDataPacket } from "mysql2";
import { PiezaLink }               from "../types/PiezaLink";
import { db }                      from "../db";

export class PiezasLinkerModel {
    public static findOne(id:Number):Promise<PiezaLink> {
        const queryString = "SELECT * FROM PiezasLinker WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    const piezaLink = new PiezaLink(row.id_pieza, row.id_componente);
                    resolve(piezaLink);
                }
            )
        });
    }
    public static findAll():Promise<PiezaLink[]> {
        const queryString = "SELECT*FROM piezasLinker";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {
                    if (err) reject(err);
                    const rows = <RowDataPacket[]> res;
                    const piezaLinks:PiezaLink[] = [];
                    rows.forEach(row => {
                        const piezaLink = new PiezaLink(row.id_pieza, row.id_componente);
                        piezaLinks.push(piezaLink);
                    });
                    resolve(piezaLinks);
                }
            );
        });
    }
}
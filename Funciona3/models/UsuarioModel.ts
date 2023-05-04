import { db } from "../db";
import { Usuario } from "../types/Usuario";
import { OkPacket, RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import { ConnectionCheckOutStartedEvent } from "mongodb";

export class UsuarioModel {

    public static register(user:Usuario):Promise<Number> {

        const saltRounds = 1;
        const queryString = "INSERT INTO Usuarios (name, password, salt) VALUES (?, ?, ?);";

        return new Promise(async(resolve, reject) => {

            const salt     = await bcrypt.genSalt(saltRounds);
            const password = await bcrypt.hash(user.password, salt);
            console.log("ASS: " + salt);
            console.log("pASSword: " + password);

            db.query(
                queryString,
                [user.name, password, salt],
                (err, res) => {
                    if (err) reject(err);
                    //const insertid = (<OkPacket> res).insertId;
                    //console.log("InsertID: " + insertid);
                    resolve(1);
                }
            );
        });
    }
    
    public static login(user:Usuario):Promise<Boolean> {
        return new Promise(async (resolve, reject) => {
            const salt          = await this.getSalt(user.name);
            const truePassword  = await this.getPass(user.name);
            const inputPassword = await bcrypt.hash(user.password, salt);
            
            if (inputPassword == truePassword) {
                resolve(true);
            } else {
                reject(new Error("boludito no es tu cuenta o sos re boludo y lo pusiste mal"))
            }
        });
    }

    private static getSalt(username:String): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT salt FROM Usuarios WHERE name = ?",
                [username],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    resolve(row.salt);
                }
            );
        });
    }

    private static getPass(username:String): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT password FROM Usuarios WHERE name = ?",
                [username],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    resolve(row.password);
                }
            );
        });
    }

    public static findAll():Promise<Usuario[]> {
        const queryString = "SELECT*FROM Usuarios";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [],
                (err, res) => {
                    if (err) reject(err);
                    const rows = <RowDataPacket[]> res;
                    const usuarios: Usuario[] = [];
                    rows.forEach(row => {
                        const usuario: Usuario = new Usuario(row.name, row.password, row.salt);
                        usuarios.push(usuario);
                    });
                    resolve(usuarios);
                }
            );
        });
    }
}
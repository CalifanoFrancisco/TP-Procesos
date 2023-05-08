import { db } from "../db";
import { Usuario } from "../types/Usuario";
import { OkPacket, RowDataPacket } from "mysql2";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../middleware/auth";

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
    
    public static login(user:Usuario):Promise<string> {
        return new Promise(async (resolve, reject) => {
            const salt          = await this.getSalt(user.name);
            const truePassword  = await this.getPass(user.name);
            const inputPassword = await bcrypt.hash(user.password, salt);
            
            const isMatch:boolean = (inputPassword == truePassword);

            if (inputPassword == truePassword) {
                const token = this.getToken(user);
                console.log("Sign:" + token);
                resolve(token);
            } else {
                reject(new Error("Contraseña incorrecta"));
            }
        });
    }
    
    private static getToken(user:Usuario):string {
        return jwt.sign(
            {
                name: user.name,
                password: user.password,
                salt: user.salt
            },
            SECRET_KEY, 
            {
                expiresIn: '2 days'
            }
        );
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

    public static findOne(username:String): Promise<Usuario> {
        const queryString = "SELECT * FROM Usuarios WHERE name = ?";
        return new Promise((resolve, reject) => {
            db.query(
                queryString,
                [username],
                (err, res) => {
                    if (err) reject(err);
                    const row = (<RowDataPacket> res)[0];
                    const usuario: Usuario = new Usuario(row.name, row.password, row.salt);
                    resolve(usuario);
                }
            );
        });
    }
}

export class Proceso {
    id: Number;
    id_pieza_salida: Number;
    tipo: String;
    constructor(_id:Number, _id_pieza_salida:Number, _tipo:String) {
        this.id              = _id;
        this.id_pieza_salida = _id_pieza_salida;
        this.tipo            = _tipo;
    }
};
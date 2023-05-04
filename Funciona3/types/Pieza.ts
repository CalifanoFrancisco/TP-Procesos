export class Pieza {
    id:       Number;
    material: String;
    peso:     Number;
    
    constructor(_id:Number, _material:String, _peso:Number) {
        this.id       = _id;
        this.material = _material;
        this.peso     = _peso;
    }
}
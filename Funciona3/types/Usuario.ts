export class Usuario {
    password:string;
    name:String;
    salt:String;
    
    constructor(_name:String, _password:string, _salt:String) {
        this.name     = _name;
        this.salt     = _salt;
        this.password = _password;
    }
}
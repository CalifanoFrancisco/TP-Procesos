export class Usuario {

    password:string;
    name:string;
    
    constructor(_name:string, _password:string, _salt:String) {
        this.name     = _name;
        this.password = _password;
    }
}

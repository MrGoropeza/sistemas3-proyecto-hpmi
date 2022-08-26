import { IDeposito } from "./IDeposito";

export class Deposito implements IDeposito{
    id! : number;
    sector! : string;
    tipo! : string;
    planta! : string;

    constructor()
    {
        return this;
    }
    public setId(id : number){
        this.id = id
    }
    public setSector(sector : string){
        this.sector = sector;
    }
    public setTipo(tipo : string){
        this.tipo = tipo;
    }
    public getTipo():string{
        return this.tipo;
    }
    public setPlanta(planta : string){
        this.planta = planta;
    }

}
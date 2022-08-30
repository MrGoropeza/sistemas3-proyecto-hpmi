import { IDeposito } from "./IDeposito";
import { ITipoDeposito } from "./ITipoDeposito";
import { Planta } from "./Planta";
import { Sector } from "./Sector";

export class Deposito implements IDeposito{
    idDeposito! : number;
    sector! : Sector;
    tipo! : ITipoDeposito;
    planta! : Planta;

    constructor()
    {
        return this;
    }

    // public setSector(sector : string){
    //     this.sector = sector;
    // }


}
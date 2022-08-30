import { ITipoDeposito } from "./ITipoDeposito";
import { Planta } from "./Planta";
import { Sector } from "./Sector";

export interface IDeposito{
    idDeposito: number;
    sector : Sector;
    tipo : ITipoDeposito;
    planta : Planta;
}
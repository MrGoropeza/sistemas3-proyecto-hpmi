import { CategoriaArticulo } from "./categoriaArticulo";
import { UnidadArticulo } from "./unidadArticulo";

export interface IArticuloDepositoView{
    id : number;
    idDeposito : number;
    nombre : string;
    descripcion: string;
    stock : number;
    fechaVencimiento : Date;
    estado : boolean;
    idUnidadArticulo : number;
    nombreUnidad : string;
    abreviacionUnidad : string;
    idCategoriaArticulo : number;
    nombreCategoria : string;
}
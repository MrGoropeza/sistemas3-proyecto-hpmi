import { unidadArticulo } from "./unidadArticulo";

export interface IArticuloDeposito{
    id : number;
    idDeposito : number;
    nombre : string;
    descripcion: string;
    unidad : unidadArticulo;
    stock : number;
}
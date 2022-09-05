import { UnidadArticulo } from "./unidadArticulo";

export interface IArticuloDeposito{
    id : number;
    idDeposito : number;
    nombre : string;
    descripcion: string;
    unidad : UnidadArticulo;
    stock : number;
}
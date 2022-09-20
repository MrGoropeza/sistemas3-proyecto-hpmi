import { Articulo } from "./articulo";

export interface DetalleComprobante{
    idDetalle: number;
    idArticulo: Articulo;
    idComprobante: number;
    cantidad: number;
    precio : number;
}
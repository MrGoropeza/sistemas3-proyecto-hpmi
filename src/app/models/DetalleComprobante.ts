import { Articulo } from "./articulo";
import { AtencionEncabezado } from "./AtencionDetalles";

export interface DetalleComprobante{
    idDetalle: number;
    idArticulo: Articulo;
    idComprobante: number;
    cantidad: number;
    precio : number;
}

export interface DetalleComprobanteEntrada extends AtencionEncabezado{
    idDetalle: number;
    idComprobante: number;
    cantidad: number;
    precio : number;
}
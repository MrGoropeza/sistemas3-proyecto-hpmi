import { Articulo } from "./articulo";

export interface DetalleMovimiento {
  idDetalle: number;
  idMovimiento: number;
  articulo: Articulo;
  stock: number;
}

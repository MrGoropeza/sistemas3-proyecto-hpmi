import { Proveedor } from "./Proveedor";
import { TipoComprobante } from "./TipoComprobante";

export interface Comprobante {
  idComprobante: number;
  idProveedor: Proveedor;
  idTipoComprobante: TipoComprobante;
  fechaRegistro: Date;
  categoria: string;
  subTotal: number;
  estado: boolean;
}

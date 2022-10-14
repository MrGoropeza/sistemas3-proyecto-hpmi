import { Cliente } from "./Cliente";
import { Proveedor } from "./Proveedor";
import { TipoComprobante } from "./TipoComprobante";

export interface Comprobante {
  idComprobante: number;
  idProveedor: Proveedor;
  idCliente: Cliente;
  idTipoComprobante: TipoComprobante;
  fechaRegistro: Date;
  categoria: string;
  subTotal: number;
  saldo: number;
  numero: number;
  fechaVencimiento: Date;
  fechaComprobante: Date;
  estado: boolean;
}

import { Comprobante } from "./Comprobante";

export interface DetallePago{
    idDetalle : number;
    idPago : number;
    comprobante : Comprobante;
    importe : number;
    fechaRegistro : Date;
}
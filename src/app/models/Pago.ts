export interface Pago{
    idPago : number;
    nombreProveedor : string;
    fechaRegistro : Date;
    nroComprobante : string;
    total : number;
    estado : boolean;
}

export interface PagoEntrada{
    idPago : number;
    nombreObra : string;
    fechaRegistro : Date;
    nroComprobante : string;
    total : number;
    estado : boolean;
}
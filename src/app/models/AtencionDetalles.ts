export interface AtencionEncabezado{
    idAtencion: number;
    fechaInicio: Date;
    fechaFin: Date;
    tipoAtencion: tipoAtencion;
    sintomas: string;
    diagnostico: string;
    estado: boolean;
    facturada: boolean;
    idPaciente: number;
    idObraSocial: number;
    idMedico: number;
    subtotal: number;
}
export interface AtencionView extends AtencionEncabezado{
    dniPaciente : string;
    nombrePaciente : string;
    apellidoPaciente : string;
    nombreObraSocial : string;
    dniMedico : string;
    nombreMedico : string;
    apellidoMedico : string;
}

export interface AtencionDetalleArticulo{
    idAtencion: number;
    idArticulo: number;
    nombreArticulo: string;
    cantidadArticulo: number;
    precioArticulo: number;
}

export interface AtencionDetallePrestacion{
    idAtencion: number;

    codigoPrestacion: string;
    nombrePrestacion: string;
    precioPrestacion: number;
}

export interface Atencion extends AtencionEncabezado{
    articulos: AtencionDetalleArticulo[];
    prestaciones: AtencionDetallePrestacion[];
}

export enum tipoAtencion{
    "Consulta Ambulatoria", 
    "Emergencia", 
    "Hospitalización"
}
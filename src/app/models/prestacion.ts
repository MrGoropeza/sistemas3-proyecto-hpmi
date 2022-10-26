export interface Prestacion{
    codigo: string;
    nombre: string;
    precio: number;
    estado: boolean;
}

export interface PrestacionAtencion extends Prestacion{
    cantidad: number;
}
export interface ArticuloComprobante{
    id: number;
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;
    estado: boolean;
    fechaVencimiento: Date;

    idCategoriaArticulo: number;
    nombreCategoria: string;

    idUnidadArticulo: number;
    nombreUnidad: string;
    abreviacionUnidad: string;
}
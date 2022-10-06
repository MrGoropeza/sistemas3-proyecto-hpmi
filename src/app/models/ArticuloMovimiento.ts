export interface ArticuloMovimiento{
    id: number;
    nombre: string;
    descripcion: string;
    cantidadActual: number;
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
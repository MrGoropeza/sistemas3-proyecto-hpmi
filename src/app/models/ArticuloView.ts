export interface ArticuloView {
    id: number;
    nombre: string;
    descripcion: string;
    stock: number;
    estado: boolean;
    fechaVencimiento: Date;

    idCategoriaArticulo: number;
    nombreCategoria: string;

    idUnidadArticulo: number;
    nombreUnidad: string;
    abreviacionUnidad: string;
}
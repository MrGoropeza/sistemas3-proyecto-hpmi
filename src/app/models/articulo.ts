import { categoriaArticulo } from "./categoriaArticulo";
import { unidadArticulo } from "./unidadArticulo";

export class Articulo {

    id! : number;
    nombre! : string;
    descripcion!: string;
    unidad!: unidadArticulo;
    fechaVencimiento! : Date;
    categoria! : categoriaArticulo;
    stock!: number;
    estado!: boolean;

    constructor() {
        return this;
    }

    setId(id : number){
        this.id = id;
        return this;
    }

    setCategoria(categoria: categoriaArticulo){
        this.categoria = categoria;
        return this;
    }

    setNombre(nombre: string){
        this.nombre = nombre;
        return this;
    }

    setDescripcion(descripcion: string){
        this.descripcion = descripcion;
        return this;
    }

    setUnidad(unidad: unidadArticulo){
        this.unidad = unidad;
        return this;
    }

    setFechaVencimiento(fechaVencimiento: Date){
        this.fechaVencimiento = fechaVencimiento;
        return this;
    }

    setStock(stock: number){
        this.stock = stock;
        return this;
    }


}
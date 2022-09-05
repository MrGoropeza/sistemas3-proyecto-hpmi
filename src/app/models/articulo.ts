import { CategoriaArticulo } from "./categoriaArticulo";
import { UnidadArticulo } from "./unidadArticulo";

export class Articulo {

    id! : number;
    nombre! : string;
    descripcion!: string;
    unidad!: UnidadArticulo;
    fechaVencimiento! : Date;
    categoria! : CategoriaArticulo;
    stock!: number;
    estado!: boolean;

    constructor() {
        return this;
    }
    
    setId(id : number){
        this.id = id;
        return this;
    }

    setCategoria(categoria: CategoriaArticulo){
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

    setUnidad(unidad: UnidadArticulo){
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
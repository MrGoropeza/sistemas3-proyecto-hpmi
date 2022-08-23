import { categoriaArticulo } from "./categoriaArticulo";

export class Articulo {

    id! : number;
    nombre! : string;
    descripcion!: string;
    fechaVencimiento! : Date
    categoria! : categoriaArticulo

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

    setFechaVencimiento(fechaVencimiento: Date){
        this.fechaVencimiento = fechaVencimiento;
        return this;
    }
}
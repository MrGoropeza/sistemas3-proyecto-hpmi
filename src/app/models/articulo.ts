import { CategoriaArticulo } from "./categoriaArticulo";
import { IArticuloDepositoView } from "./IArticuloDeposito";
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

    static fromArticulosDepositoView(obj: IArticuloDepositoView): Articulo{
        let categoria = new CategoriaArticulo();
        categoria.id = obj.idCategoriaArticulo;
        categoria.nombreCategoria = obj.nombreCategoria;

        let unidad = new UnidadArticulo();
        unidad.id = obj.idUnidadArticulo;
        unidad.nombre = obj.nombreUnidad;
        unidad.abreviacion = obj.abreviacionUnidad;

        return new Articulo()
            .setId(obj.id)
            .setNombre(obj.nombre)
            .setDescripcion(obj.descripcion)
            .setFechaVencimiento(obj.fechaVencimiento)
            .setStock(obj.stock)
            .setCategoria(categoria)
            .setUnidad(unidad);
    }

}
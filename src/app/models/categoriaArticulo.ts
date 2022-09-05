export class CategoriaArticulo {

    id! : number;
    nombreCategoria! : string;
    estado! : boolean;

    constructor() {
        return this;
    }

    setId(id: number){
        this.id = id;
        return this;
    }

    setNombre(nombre: string){
        this.nombreCategoria = nombre;
        return this;
    }

}
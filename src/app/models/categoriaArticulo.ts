export class categoriaArticulo {

    id! : number;
    nombreCategoria! : string;

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
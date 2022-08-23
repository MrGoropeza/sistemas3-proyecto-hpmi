export class categoriaArticulo {

    id! : number;
    nombre! : string;

    constructor() {
        return this;
    }

    setId(id: number){
        this.id = id;
        return this;
    }

    setNombre(nombre: string){
        this.nombre = nombre;
        return this;
    }

}
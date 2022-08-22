export class Deposito{
    nombre : string;
    sector : string;
    tipo : string;
    planta : string;

    constructor(nombre  : string, sector : string, tipo: string, planta: string)
    {
        this.nombre = nombre;
        this.planta = planta;
        this.sector = sector;
        this.tipo = tipo;
    }
}
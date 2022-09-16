

export interface Proveedor{
    idProveedor: number;
    nombre : string;
    telefono : string ;
    correo : string ;
    domicilio : string;
    fechaRegistro : Date;
    estado : boolean;
}
export type proveedorData = Omit<Proveedor,"idProveedor"|"fechaRegistro">
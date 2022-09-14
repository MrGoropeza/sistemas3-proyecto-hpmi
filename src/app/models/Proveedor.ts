

export interface Proveedor{
    idProveedor: number;
    nombre : string | null;
    telefono : string | null;
    correo : string | null;
    domicilio : string | null;
    fechaRegistro : Date;
}
export type proveedorData = Omit<Proveedor,"idProveedor"|"fechaRegistro">
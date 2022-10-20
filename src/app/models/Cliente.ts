export interface Cliente{
    idCliente : number;
    dniCliente : string;
    nombre : string;
    apellido : string;
    CUIT : string;
    correo : string;
    domicilio : string;
    telefono : string;
    fechaRegistro : Date;
    fechaNacimiento : Date;
    estado : boolean;
    tipoPersona : string;
}
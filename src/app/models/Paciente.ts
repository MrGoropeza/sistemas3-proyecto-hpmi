import { ObraSocial } from "./ObraSocial";


export interface Paciente{
    idPaciente : number;
    estado : boolean;
    fechaIngreso : Date;
    idObraSocial : number;
}
export interface PacienteView extends Paciente{
    nombreObraSocial : string;
    pacienteApellido : string;
    pacienteNombre : string;
    pacienteCuil : string;
    idPersona : number;
    
}

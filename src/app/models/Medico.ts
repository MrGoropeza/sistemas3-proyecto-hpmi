import { Persona } from "./Persona";

export interface Medico{
    idMedico : number;
    persona : Persona;
    Cargo : string;
    Especialidad : string;
    estado : boolean;
}
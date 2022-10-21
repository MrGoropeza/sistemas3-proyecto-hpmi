import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { Paciente, PacienteView } from "src/app/models/Paciente";
import { Persona } from "src/app/models/Persona";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class PacienteService {
  supabase: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  async getCant() {
    return await this.supabase
      .from<Paciente>("Paciente")
      .select("idPaciente")
      .eq("estado", true);
  }
  async update(paciente: Paciente,persona : Persona) {
    let req = await this.supabase
    .from<Paciente>("Paciente")
    .update({
      idObraSocial : paciente.idObraSocial,
      fechaIngreso : paciente.fechaIngreso
    })
    .eq('idPaciente',paciente.idPaciente)
    .single();
    if(req.data){
      let reqPersona = await this.supabase
      .from<Persona>("Persona")
      .update({
        apellido :persona.apellido,
        nombre : persona.nombre,
        dni : persona.dni,
        cuil : persona.cuil,
        domicilio : persona.domicilio,
        fechaNacimiento: persona.fechaNacimiento,
        telefono : persona.telefono,
        email : persona.email
      })
      .eq('idPersona',persona.idPersona)
      .single();
    }
  }
  async insert(paciente: Paciente) {
    let request = await this.supabase
    .from<Paciente>("Paciente")
    .insert({
      idPersona : paciente.idPersona,
      idObraSocial : paciente.idObraSocial,
      fechaIngreso : paciente.fechaIngreso
    }).single();
    if(request.data){
      return request.data as Paciente;
    }else{
      console.log(request.error);
      return {} as Paciente;
    }
  }
  async getItems(params?: LazyLoadEvent) {
    let query = this.supabase
      .from<PacienteView>("PacienteView")
      .select("*")
      .eq("estado", true)
      .order("idPaciente", { ascending: false });

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }

    if (params?.globalFilter) {
      query = query.or(
        `or(nombreObraSocial.ilike.%${params.globalFilter}%,pacienteApellido.ilike.%${params.globalFilter}%,pacienteNombre.ilike.%${params.globalFilter}%,pacienteCuil.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }
  async delete(id: number) {
    let query = this.supabase
      .from<Paciente>("Paciente")
      .update({ estado: false })
      .eq("idPaciente", id);
    return query;
  }
}

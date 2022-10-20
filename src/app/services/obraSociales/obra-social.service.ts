import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { ObraSocial } from 'src/app/models/ObraSocial';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  supabase: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  async getCant() {
    return await this.supabase
      .from<ObraSocial>("ObraSocial")
      .select("idObraSocial")
      .eq("estado", true);
  }
  async update(item : ObraSocial) {
    // let req = await this.supabase
    // .from<Paciente>("Paciente")
    // .update({
    //   fechaEgreso : paciente.fechaEgreso,
    //   fechaIngreso : paciente.fechaIngreso
    // })
    // .eq('idPaciente',paciente.idPaciente)
    // .single();
    // if(req.data){
    //   let reqPersona = await this.supabase
    //   .from<Persona>("Persona")
    //   .update({
    //     apellido : paciente.persona.apellido,
    //     nombre : paciente.persona.nombre,
    //     dni : paciente.persona.dni,
    //     cuil : paciente.persona.cuil,
    //     domicilio : paciente.persona.domicilio,
    //     fechaNacimiento: paciente.persona.fechaNacimiento,
    //     telefono : paciente.persona.telefono,
    //     email : paciente.persona.email
    //   })
    //   .eq('idPersona',paciente.persona.idPersona)
    //   .single();
    // }
  }
  async insert(item : ObraSocial) {
    let request = await this.supabase
    .from<ObraSocial>("ObraSocial")
    .insert({
      "nombre" : item.nombre,
      "cuit" : item.cuit
    }).single();
    if(request.data){
      return request.data as ObraSocial;
    }else{
      console.log(request.error);
      return {} as ObraSocial;
    }
    // if(request.data){
    //   return request.data as Medico;
    // }else{
    //   console.log(request.error);
    //   return {} as Medico;
    // }
  }
  async getItems(params?: LazyLoadEvent) {
    let query = this.supabase
      .from<ObraSocial>("ObraSocial")
      .select("*")
      .eq("estado", true)
      .order("idObraSocial", { ascending: false });

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
        `or(nombre.ilike.%${params.globalFilter}%,cuit.ilike.%${params.globalFilter}%)`);
    }
    let { data, error } = await query;
    return { data, error };
  }
  async delete(id: number) {
    let query = this.supabase
      .from<ObraSocial>("ObraSocial")
      .update({ estado: false })
      .eq("idObraSocial", id);
    return query;
  }
}

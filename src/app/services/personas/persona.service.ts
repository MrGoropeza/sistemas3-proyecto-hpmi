import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Persona } from 'src/app/models/Persona';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  supabase: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  async insert(persona : Persona) {
    let request = await this.supabase
    .from<Persona>("Persona")
    .insert({
      email : persona.email,
      cuil : persona.cuil,
      domicilio : persona.domicilio,
      nombre : persona.nombre,
      apellido : persona.apellido,
      fechaNacimiento : persona.fechaNacimiento,
      dni : persona.dni,
      Genero : persona.Genero,
      telefono : persona.telefono
      
    }).single();
    if(request.data){
      return request.data.idPersona;
    }else{
      console.log(request.error);
      return 0
      
    }
  }
  public async getPersona(idPersona : number){
    let query = this.supabase
    .from<Persona>("Persona")
    .select("*")
    .eq("idPersona",idPersona)
    .single();
    let { data, error } = await query;
    return { data, error };
  }
}

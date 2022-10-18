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

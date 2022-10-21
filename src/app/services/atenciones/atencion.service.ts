import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { AtencionEncabezado } from 'src/app/models/AtencionDetalles';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  supabase: SupabaseClient;

  constructor(
    private supabaseService : SupabaseService
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  async getCantAtenciones(){
    return await this.supabase
      .from("Atencion")
      .select("idAtencion")
      .eq("estado", true);
  }

  async getAtenciones(params?: LazyLoadEvent){
    let query = this.supabase.from<AtencionEncabezado>("AtencionEncabezadoView").select("*").eq("estado",true);

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
        `or(tipoAtencion.ilike.%${params.globalFilter}%,nombrePaciente.ilike.%${params.globalFilter}%,apellidoPaciente.ilike.%${params.globalFilter}%,nombreMedico.ilike.%${params.globalFilter}%,apellidoMedico.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }

  async createAtencion(atencion: any){
    let request = await this.supabase.from<AtencionEncabezado>("Atencion")
      .insert(atencion)
      .single();

    return {data: request.data, error: request.error};
  }
  
}

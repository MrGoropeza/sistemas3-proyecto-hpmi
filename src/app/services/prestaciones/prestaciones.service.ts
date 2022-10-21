import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { Prestacion } from 'src/app/models/prestacion';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PrestacionesService {

  supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseService
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  async getCantPrestaciones() {
    return await this.supabase
      .from("Prestacion")
      .select("codigo")
      .eq("estado", true);
  }

  async getPrestaciones(params?: LazyLoadEvent) {
    let query = this.supabase.from<Prestacion>("Prestacion").select("*").eq("estado",true);

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
        `or(codigo.ilike.%${params.globalFilter}%,nombre.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }

  async createPrestacion(prestacion: Prestacion){
    let request = await this.supabase.from<Prestacion>("Prestacion")
      .upsert(prestacion)
      .single();

    return {data: request.data, error: request.error}
  }

  async deletePrestacion(prestacion: Prestacion){
    let request = await this.supabase.from<Prestacion>("Prestacion")
      .update({estado: false})
      .eq("codigo", prestacion.codigo)
      .single();

    return {data: request.data, error: request.error}
  }
}

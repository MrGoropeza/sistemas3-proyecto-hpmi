import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { IArticuloDepositoView } from 'src/app/models/IArticuloDeposito';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDepositoSeleccionadoService {

  private supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseService,
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  async readArticulosView(idDeposito: number, params?: LazyLoadEvent) {
    // console.log(params);

    let query = this.supabase.from<IArticuloDepositoView>("ArticulosDepositoView")
      .select("*")
      .eq("estado", true)
      .eq("idDeposito", idDeposito)
    
    if(params?.first !== undefined && params?.rows !== undefined){
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if(params?.sortField !== undefined  && params?.sortOrder !== undefined ){
      query = query.order(params.sortField as any, {ascending: params.sortOrder === 1});
    }

    if(params?.globalFilter){
      query = query
        .or(`or(nombre.ilike.%${params.globalFilter}%,descripcion.ilike.%${params.globalFilter}%,nombreCategoria.ilike.%${params.globalFilter}%)`)
    }

    const {data, error} = await query;

    return {data, error};
  }

  async getCantArticulos(idDeposito: number): Promise<number> {
    const {count} = await this.supabase.from('ArticulosDepositoView')
        .select("id", {head: true, count: "exact"})
        .eq("estado", true)
        .eq("idDeposito", idDeposito);
    return count ? count : 0;
  }

  async getDepositosDestinos(idDeposito: Number){
    const {data, error} = await this.supabase.from("Deposito")
      .select("idDeposito, idPlanta, idSector")
      .eq("estado", true)
      .neq("idDeposito", idDeposito);
    return {data, error};
  }
}

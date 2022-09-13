import { Movimiento } from './../../models/Movimiento';
import { SupabaseService } from './../supabase.service';
import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  supabase: SupabaseClient;

  constructor(private supabaseService : SupabaseService) { 
    this.supabase = supabaseService.getSupabaseClient();
  }

  public async getMovimientos(){
    let { data: Movimiento, error } = await this.supabase
      .from<Movimiento>('Movimiento')
      .select(`
        idMovimiento,
        fechaRegistro,
        idDeposito,
        idTipoMovimiento : idTipoMovimiento(nombre)
      `)
      return { data: Movimiento, error };
  }

  async createMovimiento(idDeposito: number){
    return await this.supabase.from<Movimiento>("Movimiento")
      .insert({
        "idDeposito": idDeposito
      }) as {data: Movimiento[], error: any};
  }



}

import { Movimiento } from './../../models/Movimiento';
import { SupabaseService } from './../supabase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private supabase : SupabaseService) { }
  public async getMovimientos(){
    let { data: Movimiento, error } = await this.supabase.getSupabaseClient()
  .from<Movimiento>('Movimiento')
  .select(`
  idMovimiento,
  fechaRegistro,
  idDepositoFuente,
  idDepositoDestino
  `)
  return { data: Movimiento, error };
  }
}

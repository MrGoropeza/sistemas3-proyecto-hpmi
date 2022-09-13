import { Movimiento } from './../../models/Movimiento';
import { SupabaseService } from './../supabase.service';
import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { ITipoMovimiento } from 'src/app/models/TipoMovimiento';
import { IArticuloDepositoView } from 'src/app/models/IArticuloDeposito';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  supabase: SupabaseClient;

  constructor(private supabaseService : SupabaseService) { 
    this.supabase = supabaseService.getSupabaseClient();
  }

  async getMovimientos(){
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

  async getIdTipoSalida(){
    let request = await this.supabase
      .from<ITipoMovimiento>("TipoMovimiento")
      .select("*")
      .eq("nombre", "Salida")
      .single()
    return request.data?.id;
  }

  async getIdTipoEntrada(){
    let request = await this.supabase
      .from<ITipoMovimiento>("TipoMovimiento")
      .select("*")
      .eq("nombre", "Entrada")
      .single();
    return request.data?.id;
  }

  async createSalida(idDeposito: number, idArticulo: number, cantidad: number){
    await this.supabase.from("Movimiento")
      .insert({
        "idDeposito": idDeposito,
        "idTipoMovimiento": await this.getIdTipoSalida(),
        "cantidad": cantidad
      }).single() as {data: Movimiento[], error: any};

    let requestArticuloDeposito = await this.supabase
      .from("ArticuloDeposito")
      .select("*")
      .eq("idArticulo", idArticulo).eq("idDeposito", idDeposito)
      .single();

    let idArticuloDeposito = requestArticuloDeposito.data.idArticuloDeposito;
    
    let requestDecremento = await this.supabase
      .rpc('decrementarstockdeposito', {
        cantidad, 
        filaid: idArticuloDeposito
      })
    
    if(requestDecremento.error){
      console.log(requestDecremento.error);
      console.log(`idArticuloDeposito: ${idArticuloDeposito}`);
      
    }
      
  }

  async createEntrada(idDeposito: number, idArticulo: number, cantidad: number){
    await this.supabase.from("Movimiento")
      .insert({
        "idDeposito": idDeposito,
        "idTipoMovimiento": await this.getIdTipoEntrada(),
        "cantidad": cantidad
      }).single() as {data: Movimiento[], error: any};

    let requestArticuloDeposito = await this.supabase
      .from("ArticuloDeposito")
      .select("*")
      .eq("idArticulo", idArticulo).eq("idDeposito", idDeposito)
      .single();

    let idArticuloDeposito = requestArticuloDeposito.data.idArticuloDeposito;
    
    let requestDecremento = await this.supabase
      .rpc('incrementarstockdeposito', {
        cantidad, 
        filaid: idArticuloDeposito
      })
    
    if(requestDecremento.error){
      console.log(requestDecremento.error);
      console.log(`idArticuloDeposito: ${idArticuloDeposito}`);
      
    }
      
  }

}

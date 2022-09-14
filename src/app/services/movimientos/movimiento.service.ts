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
      .order("fechaRegistro")
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
    return this.crearMovimiento("Salida", idDeposito, idArticulo, cantidad);
  }

  async createEntrada(idDeposito: number, idArticulo: number, cantidad: number){
    return this.crearMovimiento("Entrada", idDeposito, idArticulo, cantidad);
  }

  private async crearMovimiento(tipo: string, idDeposito: number, idArticulo: number, cantidad: number){

    let procedimientoAlmacenado: string = "";
    let idTipoMovimiento: number = 0;

    switch(tipo){
      case TipoMovimiento.Entrada:
        procedimientoAlmacenado = "incrementarstockdeposito";
        let requestIDEn = await this.getIdTipoEntrada();
        if(requestIDEn){
          idTipoMovimiento = requestIDEn;
        }
        break;
    
      case TipoMovimiento.Salida:
        procedimientoAlmacenado = "decrementarstockdeposito";
        let requestIDSal = await this.getIdTipoSalida();
        if(requestIDSal){
          idTipoMovimiento = requestIDSal;
        }
        break;
    }

    let requestMovimiento = await this.supabase.from("Movimiento")
      .insert({
        "idDeposito": idDeposito,
        "idTipoMovimiento": idTipoMovimiento,
        "cantidad": cantidad
      }).single() as {data: Movimiento, error: any};

    let requestArticuloDeposito = await this.supabase
      .from("ArticuloDeposito")
      .select("*")
      .eq("idArticulo", idArticulo).eq("idDeposito", idDeposito)
      .single();

    let idArticuloDeposito = requestArticuloDeposito.data?.idArticuloDeposito;

    if(idArticuloDeposito == null || idArticuloDeposito == undefined){
      let nuevoArtDep = await this.supabase
       .from("ArticuloDeposito")
       .insert({
          idArticulo: idArticulo,
          idDeposito: idDeposito,
          stock: 0
       }).single();

       idArticuloDeposito = nuevoArtDep.data?.idArticuloDeposito;
    }
    
    await this.supabase
      .rpc(procedimientoAlmacenado, {
        cantidad, 
        filaid: idArticuloDeposito
      })
    
    
    return {data: requestMovimiento.data, error: requestMovimiento.error};
  }

}

enum TipoMovimiento {
  Entrada = "Entrada",
  Salida = "Salida",
}
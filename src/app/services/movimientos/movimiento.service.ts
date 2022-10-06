import { Movimiento } from './../../models/Movimiento';
import { SupabaseService } from './../supabase.service';
import { Injectable } from '@angular/core';
import { PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
import { ITipoMovimiento } from 'src/app/models/TipoMovimiento';
import { IArticuloDepositoView } from 'src/app/models/IArticuloDeposito';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';

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

  async createSalida(idDeposito: number, articulos: ArticuloMovimiento[], motivo?: string){
    return this.crearMovimiento("Salida", idDeposito, articulos);
  }

  async createEntrada(idDeposito: number, articulos: ArticuloMovimiento[], motivo?: string){
    return this.crearMovimiento("Entrada", idDeposito, articulos);
  }

  async createTransferencia(
    idDepositoFuente: number,
    idDepositoDestino: number,
    articulos: ArticuloMovimiento[],
    motivo?: string
  ){
    let salida = await this.createSalida(idDepositoFuente, articulos, motivo);
    let entrada = await this.createEntrada(idDepositoDestino, articulos, motivo);

    return {
      data: {
        salida: salida.data,
        entrada: entrada.data
      },
      error: {
        salida: salida.error,
        entrada: entrada.error
      }
    }
  }


  private async crearMovimiento(tipo: string, idDeposito: number, articulos: ArticuloMovimiento[], motivo?: string){

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
        "motivo": motivo
      }).single() as {data: Movimiento, error: any};

    let detalles: PostgrestResponse<any>[] = [];

    articulos.forEach(async articulo => {
      let requestArticuloDeposito = await this.supabase
        .from("ArticuloDeposito")
        .select("*")
        .eq("idArticulo", articulo.id).eq("idDeposito", idDeposito)
        .single();
  
      let idArticuloDeposito = requestArticuloDeposito.data?.idArticuloDeposito;
  
      if(idArticuloDeposito == null || idArticuloDeposito == undefined){
        let nuevoArtDep = await this.supabase
         .from("ArticuloDeposito")
         .insert({
            idArticulo: articulo.id,
            idDeposito: idDeposito,
            stock: 0
         }).single();
  
         idArticuloDeposito = nuevoArtDep.data?.idArticuloDeposito;
      }
      
      await this.supabase
        .rpc(procedimientoAlmacenado, {
          cantidad: articulo.cantidad, 
          filaid: idArticuloDeposito
        })

      let requestDetalle = await this.supabase.from("DetalleMovimiento")
        .insert({
          idMovimiento: requestMovimiento.data.idMovimiento,
          idArticulo: articulo.id,
          stock: articulo.cantidad
        })

      detalles.push(requestDetalle);
      
    });

    
    
    return {
      data: {
        movimiento: requestMovimiento.data,
        detalles: detalles
      },
      error: {
        movimiento: requestMovimiento.error,
      }
      
    };
  }

}

enum TipoMovimiento {
  Entrada = "Entrada",
  Salida = "Salida",
}
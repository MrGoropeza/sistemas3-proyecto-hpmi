import { Movimiento } from './../../models/Movimiento';
import { SupabaseService } from './../supabase.service';
import { Injectable } from '@angular/core';
import { PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
import { ITipoMovimiento } from 'src/app/models/TipoMovimiento';
import { IArticuloDepositoView } from 'src/app/models/IArticuloDeposito';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';
import { LazyLoadEvent } from 'primeng/api';

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
        idTipoMovimiento : idTipoMovimiento(nombre),
        motivo
      `)
      .order("fechaRegistro")
      return { data: Movimiento, error };
  }

  async getMovimientosLazy(params?: LazyLoadEvent, idDeposito?: number){
    let query = this.supabase
      .from<Movimiento>('Movimiento')
      .select(`
        idMovimiento,
        fechaRegistro,
        idDeposito,
        idTipoMovimiento : idTipoMovimiento(nombre),
        motivo
      `)
      .eq("estado", true)

    if(idDeposito !== undefined){
      query = query.eq("idDeposito", idDeposito);
    }
    
    if(params?.first !== undefined && params?.rows !== undefined){
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if(params?.sortField !== undefined  && params?.sortOrder !== undefined ){
      query = query.order(params.sortField as any, {ascending: params.sortOrder === 1});
    }

    if(params?.globalFilter){
      query = query
        .or(`or(nombre.ilike.%${params.globalFilter}%,CUIT.ilike.%${params.globalFilter}%)`)
    }

    return query;
  }

  async getCantMovimientos(idDeposito?: number){
    let query = this.supabase
      .from("Movimiento").select("idMovimiento").eq('estado', true);

    if(idDeposito !== undefined){
      query = query.eq("idDeposito", idDeposito);
    }

    return await query;
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
    return await this.crearMovimiento("Salida", idDeposito, articulos, motivo);
  }

  async createEntrada(idDeposito: number, articulos: ArticuloMovimiento[], motivo?: string){
    return await this.crearMovimiento("Entrada", idDeposito, articulos, motivo);
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

    console.log(`Motivo dentro del servicio: ${motivo}`);
    
    let requestMovimiento = await this.supabase.from("Movimiento")
      .insert({
        "idDeposito": idDeposito,
        "idTipoMovimiento": idTipoMovimiento,
        "motivo": motivo
      }).single() as {data: Movimiento, error: any};

    let detalles: any = [];

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
      
      let procedimiento = await this.supabase
        .rpc(procedimientoAlmacenado, {
          cantidad: articulo.cantidad, 
          filaid: idArticuloDeposito
        });
      
      let requestDetalle = await this.supabase.from("DetalleMovimiento")
      .insert({
        idMovimiento: requestMovimiento.data.idMovimiento,
        idArticulo: articulo.id,
        stock: articulo.cantidad
      })

      detalles.push(requestDetalle.data);

      
      
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
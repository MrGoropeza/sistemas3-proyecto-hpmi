import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
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

    let {data, error} = await query;

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
      .select("idDeposito, idPlanta, idSector)")
      .eq("estado", true)
      .neq("idDeposito", idDeposito);
    return {data, error};
  }

  async realizarTransferencia(
    idDepositoFuente: number,
    idDepositoDestino: number, 
    articulo: Articulo, 
    cantidad: number
  ){
    

    let filaDecrementada = await this.supabase
      .from("ArticuloDeposito")
      .select("*")
      .eq("idDeposito", idDepositoFuente)
      .eq("idArticulo", articulo.id);

    if(filaDecrementada.data){
      let decremento = await this.supabase.rpc(
        'decrementarstockdeposito', 
        {filaid: filaDecrementada.data[0].idArticuloDeposito, cantidad: cantidad}
      );
      if(decremento.error){
        // console.log("Error al decrementar:");
        // console.log(decremento.error);
      }else{
        // console.log("Decrementado exitoso:");
        // console.log(decremento.data);
        
      }
    }else{
      // console.log("Error al buscar fila de decremento:");
      // console.log(filaDecrementada.error);
      
    }

    // console.log("Busqueda fila a incrementar:");
    // console.log(articulo);
    // console.log(idDepositoDestino);
    
    

    let filaIncrementada = await this.supabase
      .from("ArticuloDeposito")
      .select("idArticuloDeposito")
      .eq("idArticulo", articulo.id)
      .eq("idDeposito", idDepositoDestino);
    
    if(filaIncrementada.data){
      if(filaIncrementada.data.length > 0){
        console.log(filaIncrementada.data);
        await this.supabase.rpc(
          'incrementarstockdeposito', 
          {filaid: filaIncrementada.data[0].idArticuloDeposito, cantidad: cantidad}
        );
      }else{
        console.log("Fila no encontrada");
        await this.supabase.from("ArticuloDeposito")
          .insert({
            idArticulo: articulo.id,
            idDeposito: idDepositoDestino,
            stock: cantidad
          });
      }
      
    }else{
      // console.log("Error al buscar fila a incrementar:");
      // console.log(filaIncrementada.error);
      
      await this.supabase.from("ArticuloDeposito")
        .insert({
          idArticulo: articulo.id,
          idDeposito: idDepositoDestino,
          stock: cantidad
        });
    }

  }

}

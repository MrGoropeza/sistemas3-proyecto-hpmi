import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { IArticuloDepositoView } from 'src/app/models/IArticuloDeposito';
import { ITipoDeposito } from 'src/app/models/ITipoDeposito';
import { Movimiento } from 'src/app/models/Movimiento';
import { DetalleMovimientoService } from '../movimientos/detalle-movimiento.service';
import { MovimientoService } from '../movimientos/movimiento.service';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDepositoSeleccionadoService {

  private supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseService,
    private supabaseMovimientos: MovimientoService,
    private supabaseDetalleMovimientos: DetalleMovimientoService
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

  async getDepositoPrincipal(){
    let requestTipo = await this.supabase
      .from<ITipoDeposito>("TipoDeposito")
      .select("*")
      .eq("nombre", "Almacén Principal de Farmacia");

    let resultado = -1;    

    if(requestTipo.data){
      let requestDeposito = await this.supabase
        .from("Deposito")
        .select("*")
        .eq("idTipoDeposito", requestTipo.data[0].idTpoDeposito);
      
      if(requestDeposito.data){
        
        resultado = requestDeposito.data[0].idDeposito;
      }
    }

    return resultado;
  }

  async getDepositosDestinos(idDeposito: Number){
    const {data, error} = await this.supabase.from("Deposito")
      // .select("idDeposito, idPlanta, idSector")
      .select("idDeposito,sector:idSector(idSector,nombre),tipo:idTipoDeposito(idTpoDeposito,nombre),planta:idPlanta(idPlanta,nombre)")
      .eq("estado", true)
      .neq("idDeposito", idDeposito);
    return {data, error};
  }

}

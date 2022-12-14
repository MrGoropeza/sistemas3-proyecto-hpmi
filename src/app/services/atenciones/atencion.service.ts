import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';
import { Atencion, AtencionDetalleArticulo, AtencionDetallePrestacion, AtencionEncabezado } from 'src/app/models/AtencionDetalles';
import { PrestacionAtencion } from 'src/app/models/prestacion';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  supabase: SupabaseClient;

  constructor(
    private supabaseService : SupabaseService
  ) {
    this.supabase = this.supabaseService.getSupabaseClient();
  }

  async getCantAtenciones(idObraSocial?: number){
    let query = this.supabase
      .from("AtencionEncabezadoView")
      .select("idAtencion")
      .eq("estado", true);

    if(idObraSocial){
      query = query
        .eq("idObraSocial", idObraSocial)
        .eq("facturada", false);
    }

    return await query;
  }
  async getSubTotal(id : number){
    return await this.supabase
      .from("Atencion")
      .select("idAtencion")
      .eq("estado", true)
      .eq('idAtencion',id);
  }
  async getAtencionesArticulos(id : number,params?: LazyLoadEvent){
    let query = this.supabase.from<AtencionDetalleArticulo>("AtencionArticuloView").select("*").eq("idAtencion",id);

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }
    let { data, error } = await query;
    return { data, error };
  }
  async getAtencionesPrestaciones(id : number,params?: LazyLoadEvent){
    let query = this.supabase.from<AtencionDetallePrestacion>("AtencionPrestacionView").select("*").eq("idAtencion",id);

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }
    let { data, error } = await query;
    return { data, error };
  }
  async getAtencionesXPersona(id : number,nombreIdentificador : string){
    if(!id){
      return {};
    }
    let query = this.supabase.from("AtencionEncabezadoView").select("*").eq("estado",true).eq(nombreIdentificador,id);
    let { data, error } = await query;
    return { data, error };
  }

  async getAtenciones(params?: LazyLoadEvent,id? : number, nombreIdentificador? : string, idObraSocial?: number){
    let query = this.supabase
      .from<AtencionEncabezado>("AtencionEncabezadoView")
      .select("*")
      .eq("estado",true);


    if(idObraSocial !== undefined){
      query = query
        .eq("idObraSocial", idObraSocial)
        .eq("facturada", false);
    }

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }
    if(id){
      if(nombreIdentificador == 'paciente'){
        query = this.supabase
          .from<AtencionEncabezado>("AtencionEncabezadoView")
          .select("*")
          .eq("estado",true)
          .eq('idPaciente',id);
      }else{
        query = this.supabase
          .from<AtencionEncabezado>("AtencionEncabezadoView")
          .select("*")
          .eq("estado",true)
          .eq('idMedico',id);
      }
    }
    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }
    

    if (params?.globalFilter) {
      query = query.or(
        `or(tipoAtencion.ilike.%${params.globalFilter}%,nombrePaciente.ilike.%${params.globalFilter}%,apellidoPaciente.ilike.%${params.globalFilter}%,nombreMedico.ilike.%${params.globalFilter}%,apellidoMedico.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }

  async createAtencion(
    atencion: any,
    articulos: ArticuloMovimiento[],
    prestaciones: PrestacionAtencion[]
  ){
    let request = await this.supabase.from<AtencionEncabezado>("Atencion")
      .upsert(atencion)
      .single();

    if(request.error) return {data: request.data, error: request.error};
    
    let idAtencion = request.data.idAtencion;

    let dataArticulos: any[] = []
    let errorArticulos: any[] = []
    articulos.forEach(
      async articulo => {
        let requestArticulo = await this.supabase
          .from("AtencionDetalleArticulo")
          .insert({
            idAtencion,
            idArticulo: articulo.id,
            cantidad: articulo.cantidad,
            precio: articulo.precio
          }).single();

        if(requestArticulo.data){dataArticulos.push(requestArticulo.data)}
        else{errorArticulos.push(requestArticulo.error)}
      }
    );

    let dataPrestaciones: any[] = []
    let errorPrestaciones: any[] = []
    prestaciones.forEach(
      async prestacion => {
        let requestPrestacion = await this.supabase
          .from("AtencionDetallePrestacion")
          .insert({
            idAtencion,
            codigo: prestacion.codigo,
            cantidad: prestacion.cantidad,
            precio: prestacion.precio
          }).single()
        
        if(requestPrestacion.data){dataPrestaciones.push(requestPrestacion.data)}
        else{errorPrestaciones.push(requestPrestacion.error)}
      }
    );

    return {
      data: request.data, 
      error: request.error,
      dataArticulos, 
      errorArticulos,
      dataPrestaciones,
      errorPrestaciones
    };
  }
  
  async deleteAtencion(atencion: AtencionEncabezado){
    let request = await this.supabase.from("Atencion")
      .update({estado: false})
      .eq("idAtencion", atencion.idAtencion)
      .single();

    return {data: request.data, error: request.error}
  }

}

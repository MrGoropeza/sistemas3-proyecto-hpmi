import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { from, map, Observable } from "rxjs";
import { ArticuloComprobante } from "src/app/models/ArticuloComprobante";
import { ArticuloView } from "src/app/models/ArticuloView";
import { Comprobante } from "src/app/models/Comprobante";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class ComprobantesService {

  supabase: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  public getComprobante(id : number): Observable<Comprobante[]> {
    const query = this.supabase
      .from("Comprobante")
      .select(`
      idComprobante,
      idProveedor:idProveedor(nombre),
      idTipoComprobante:idTipoComprobante(nombre),
      fechaRegistro,
      subTotal,
      categoria
      `)
      .eq('idTipoComprobante', id);
    return from(query).pipe(
      map((comprobantes) => {
        if (comprobantes.data) {
          return comprobantes.body;
        } else {
          return [] as Comprobante[];
        }
      })
    );
  }

  async readArticulos(params?: LazyLoadEvent) {
    let query = this.supabase.from<ArticuloView>("ArticuloView")
      .select("*")
      .eq("estado", true)
    
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

    let newData: ArticuloComprobante[] = [];

    if(data){
      data.forEach(
        element => {
          let aux: ArticuloComprobante = {} as ArticuloComprobante;
          aux.id = element.id;
          aux.nombre = element.nombre;
          aux.descripcion = element.descripcion;
          aux.estado = element.estado;
          aux.fechaVencimiento = element.fechaVencimiento;

          aux.idCategoriaArticulo = element.idCategoriaArticulo;
          aux.nombreCategoria = element.nombreCategoria;

          aux.idUnidadArticulo = element.idUnidadArticulo;
          aux.nombreUnidad = element.nombreUnidad;
          aux.abreviacionUnidad = element.abreviacionUnidad;

          newData.push(aux);
        }
      );
    }

    return {data: newData, error};
  } 


  async addComprobante(){
    
  }
}

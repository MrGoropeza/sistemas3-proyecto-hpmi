import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { from, map, Observable } from "rxjs";
import { ArticuloComprobante } from "src/app/models/ArticuloComprobante";
import { ArticuloView } from "src/app/models/ArticuloView";
import { Comprobante } from "src/app/models/Comprobante";
import { DetalleComprobante } from "src/app/models/DetalleComprobante";
import { SupabaseService } from "../supabase.service";
import { SupabaseDepositoSeleccionadoService } from "../deposito-seleccionado/supabase-deposito-seleccionado.service"

@Injectable({
  providedIn: "root",
})
export class ComprobantesService {

  supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseService,
    private depositoService: SupabaseDepositoSeleccionadoService
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  public async getDetalle(id: number){
    let { data: DetalleComprobante, error } = await this.supabase
      .from<DetalleComprobante>('DetalleComprobante')
      .select(`
      idArticulo : idArticulo(nombre),
      cantidad,
      precio
      `)
      .eq("idComprobante",id);
  return { data: DetalleComprobante, error };

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


  async addComprobante(
    idProveedor: number, 
    idTipoComprobante: number, 
    articulos: ArticuloComprobante[],
    categoria?: string, )
  {
    let subtotal = 0;
    let errors = [];

    articulos.forEach(articulo => {
      subtotal += articulo.cantidad * articulo.precio;
      
    });

    let requestComprobante = await this.supabase.from("Comprobante")
      .insert({
        idProveedor: idProveedor,
        idTipoComprobante: idTipoComprobante,
        categoria: categoria,
        subTotal: subtotal,
      }).single();

    if(requestComprobante.data){
      let idComprobante = requestComprobante.data.idComprobante;

      articulos.forEach(async articulo => {
        let requestDetalle = await this.supabase
          .from("DetalleComprobante")
          .insert({
            idComprobante: idComprobante,
            idArticulo: articulo.id,
            cantidad: articulo.cantidad,
            precio: articulo.precio
          }).single();

        if(idTipoComprobante === 3){
          let idDepositoPrincipal = await this.depositoService.getDepositoPrincipal();

          let requestStockActualizable = await this.supabase
            .from("ArticuloDeposito")
            .select("idArticuloDeposito, stock")
            .eq("idArticulo", articulo.id).eq("idDeposito", idDepositoPrincipal)
            .single();

          if(requestStockActualizable.data){
            let requestUpdateStock = await this.supabase
              .from("ArticuloDeposito")
              .update({
                stock: requestStockActualizable.data.stock + articulo.cantidad
              })
              .eq("idArticuloDeposito", requestStockActualizable.data.idArticuloDeposito)

            if(requestUpdateStock.error){
              errors.push(requestUpdateStock.error);
            }
          }else{
            errors.push(requestStockActualizable.error);
          }
        }

        if(requestDetalle.error){
          errors.push(requestDetalle.error);
        }
      });

    }else{
      errors.push(requestComprobante.error);
    }

    return errors;
  }
}

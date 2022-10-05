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
import { IArticuloDepositoView } from "src/app/models/IArticuloDeposito";

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
    idArticulo : idArticulo(nombre,descripcion),
    cantidad,
    precio
  `)
  .eq("idComprobante",id);
  return { data: DetalleComprobante, error };

  }
  public getComprobante(id : number): Observable<Comprobante[]> {
    const query = this.supabase
      .from<Comprobante>("Comprobante")
      .select(`
          idComprobante,
          idProveedor:idProveedor(nombre),
          idTipoComprobante:idTipoComprobante(nombre),
          fechaRegistro,
          fechaComprobante,
          fechaVencimiento,
          subTotal,
          saldo,
          categoria,
          numero
      `)
      .eq('idTipoComprobante', id)
      .eq("estado", true);
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

  async readArticulos(params?: LazyLoadEvent, idDepositoActual?: number) {
    let query = this.supabase.from<IArticuloDepositoView>("ArticulosDepositoView")
      .select("*")
      .eq("estado", true)

    if(idDepositoActual !== undefined){
      query = query.eq("idDeposito", idDepositoActual);
    }
    
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
    articulos: ArticuloComprobante[],
    comprobante: Comprobante,
  )
  {
    let subtotal = 0;
    let errors = [];

    articulos.forEach(articulo => {
      subtotal += articulo.cantidad * articulo.precio;
      
    });

    comprobante.subTotal = subtotal;

    let requestComprobante = await this.supabase.from("Comprobante")
      .insert({
        idProveedor: comprobante.idProveedor,
        idTipoComprobante: comprobante.idTipoComprobante.idTipoComprobante,
        categoria: comprobante.categoria,
        subTotal: subtotal,
        saldo: subtotal,
        numero: comprobante.numero,
        fechaVencimiento: comprobante.fechaVencimiento,
        fechaComprobante: comprobante.fechaComprobante,
        estado: true,
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

        if(comprobante.idTipoComprobante.idTipoComprobante === 3){
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


  async removeComprobante(comprobante: Comprobante){
    let request = await this.supabase.from("Comprobante")
      .update({estado: false})
      .eq("idComprobante",comprobante.idComprobante)
      .single();

    return {data: request.data, error: request.error};
  }
}

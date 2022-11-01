import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { from, map, Observable } from "rxjs";
import { ArticuloComprobante } from "src/app/models/ArticuloComprobante";
import { Comprobante } from "src/app/models/Comprobante";
import { DetalleComprobante, DetalleComprobanteEntrada } from "src/app/models/DetalleComprobante";
import { SupabaseService } from "../supabase.service";
import { SupabaseDepositoSeleccionadoService } from "../deposito-seleccionado/supabase-deposito-seleccionado.service";
import { Proveedor } from "src/app/models/Proveedor";
import { IArticuloDepositoView } from "src/app/models/IArticuloDeposito";
import { ArticuloMovimiento } from "src/app/models/ArticuloMovimiento";
import { AtencionEncabezado } from "src/app/models/AtencionDetalles";

@Injectable({
  providedIn: "root",
})
export class ComprobantesService {
  supabase: SupabaseClient;

  nombreTabla: string = "Comprobante";

  constructor(
    private supabaseService: SupabaseService,
    private depositoService: SupabaseDepositoSeleccionadoService
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  setModoEntrada(isEntrada: boolean) {
    this.nombreTabla = isEntrada ? "ComprobanteEntrada" : "Comprobante";
  }

  public async getDetalle(id: number) {
    let request = await this.supabase
      .from<DetalleComprobante>(`DetalleComprobante`)
      .select(
        `
          idArticulo(nombre, descripcion),
          cantidad,
          precio
      `
      ).eq("idComprobante", id);
    return { data: request.data, error: request.error };
  }

  async getDetalleEntrada(id: number) {
    let request = await this.supabase
      .from<DetalleComprobanteEntrada>(`CompEntradaAtencionView`)
      .select("*").eq("idComprobante", id);
    return { data: request.data, error: request.error };
  }

  async getCantComprobantes(idTipoComprobante?: number) {
    return await this.supabase
      .from<Comprobante>(`${this.nombreTabla}`)
      .select("idComprobante")
      .eq("estado", true)
      .eq(
        "idTipoComprobante",
        idTipoComprobante !== undefined ? idTipoComprobante : 1
      );
  }
  public getComprobante(id: number): Observable<Comprobante[]> {
    const query = this.supabase
      .from<Comprobante>(`${this.nombreTabla}`)
      .select(
        `
          idComprobante,
          ${
            this.nombreTabla === "Comprobante"
              ? "idProveedor:idProveedor(nombre)"
              : "idObraSocial(nombre)"
          },
          idTipoComprobante:idTipoComprobante(nombre),
          fechaRegistro,
          fechaComprobante,
          fechaVencimiento,
          subTotal,
          saldo,
          categoria,
          numero
      `
      )
      .eq("idTipoComprobante", id)
      .eq("estado", true);
    return from(query).pipe(
      map((comprobantes) => {
        if (comprobantes.data) {
          return comprobantes.body;
        } else {
          console.log(comprobantes.error);

          return [] as Comprobante[];
        }
      })
    );
  }

  async readArticulos(params?: LazyLoadEvent, idDepositoActual?: number) {
    let query = this.supabase
      .from<IArticuloDepositoView>("ArticulosDepositoView")
      .select("*")
      .eq("estado", true);

    if (idDepositoActual !== undefined) {
      query = query.eq("idDeposito", idDepositoActual);
    } else {
      query = query.eq(
        "idDeposito",
        await this.depositoService.getDepositoPrincipal()
      );
    }

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }

    if (params?.globalFilter) {
      query = query.or(
        `or(nombre.ilike.%${params.globalFilter}%,descripcion.ilike.%${params.globalFilter}%,nombreCategoria.ilike.%${params.globalFilter}%)`
      );
    }

    let { data, error } = await query;

    let newData: ArticuloMovimiento[] = [];

    if (data) {
      data.forEach((element) => {
        let aux: ArticuloMovimiento = {} as ArticuloMovimiento;
        aux.id = element.id;
        aux.nombre = element.nombre;
        aux.descripcion = element.descripcion;
        aux.estado = element.estado;
        aux.fechaVencimiento = element.fechaVencimiento;
        aux.cantidadActual = element.stock;

        aux.idCategoriaArticulo = element.idCategoriaArticulo;
        aux.nombreCategoria = element.nombreCategoria;

        aux.idUnidadArticulo = element.idUnidadArticulo;
        aux.nombreUnidad = element.nombreUnidad;
        aux.abreviacionUnidad = element.abreviacionUnidad;

        newData.push(aux);
      });
    }

    return { data: newData, error };
  }

  async addComprobante(
    articulos: ArticuloComprobante[],
    comprobante: Comprobante,
    atenciones: AtencionEncabezado[]
  ) {
    let subtotal = 0;
    let errors = [];

    comprobante.subTotal = subtotal;

    let requestComprobante;

    if (this.nombreTabla === "Comprobante") {
      articulos.forEach((articulo) => {
        subtotal += articulo.cantidad * articulo.precio;
      });

      requestComprobante = await this.supabase
        .from(`${this.nombreTabla}`)
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
        })
        .single();

      if (requestComprobante.data) {
        let idComprobante = requestComprobante.data.idComprobante;

        articulos.forEach(async (articulo) => {
          let requestDetalle = await this.supabase
            .from(`Detalle${this.nombreTabla}`)
            .insert({
              idComprobante: idComprobante,
              idArticulo: articulo.id,
              cantidad: articulo.cantidad,
              precio: articulo.precio,
            })
            .single();

          if (comprobante.idTipoComprobante.idTipoComprobante === 3) {
            let idDepositoPrincipal =
              await this.depositoService.getDepositoPrincipal();

            let requestStockActualizable = await this.supabase
              .from("ArticuloDeposito")
              .select("idArticuloDeposito, stock")
              .eq("idArticulo", articulo.id)
              .eq("idDeposito", idDepositoPrincipal)
              .single();

            if (requestStockActualizable.data) {
              let requestUpdateStock = await this.supabase
                .from("ArticuloDeposito")
                .update({
                  stock:
                    requestStockActualizable.data.stock + articulo.cantidad,
                })
                .eq(
                  "idArticuloDeposito",
                  requestStockActualizable.data.idArticuloDeposito
                );

              if (requestUpdateStock.error) {
                errors.push(requestUpdateStock.error);
              }
            } else {
              errors.push(requestStockActualizable.error);
            }
          }

          if (requestDetalle.error) {
            errors.push(requestDetalle.error);
          }
        });
      } else {
        errors.push(requestComprobante.error);
      }
    } else {
      

      subtotal = atenciones.reduce(
        (subtotal, atencion) => {return subtotal + atencion.subtotal}, 0
      );

      

      console.log("Comprobante Entrada:", comprobante);

      requestComprobante = await this.supabase
        .from(`${this.nombreTabla}`)
        .insert({
          idObraSocial: comprobante.idObraSocial,
          idTipoComprobante: comprobante.idTipoComprobante.idTipoComprobante,
          categoria: comprobante.categoria,
          subTotal: subtotal,
          saldo: subtotal,
          numero: comprobante.numero,
          fechaVencimiento: comprobante.fechaVencimiento,
          fechaComprobante: comprobante.fechaComprobante,
          estado: true,
        })
        .single();

      if(requestComprobante.error) {errors.push(requestComprobante.error); return errors;}

      let idComprobante = requestComprobante.data.idComprobante;

      let numeroFactura = String(idComprobante).padStart(7, "0");

      await this.supabase.from(this.nombreTabla)
        .update({numero: `7777-${numeroFactura}`})
        .eq("idComprobante", idComprobante)

      atenciones.forEach(
        async (atencion) => {
          await this.supabase.from("Atencion")
            .update({"facturada": true})
            .eq("idAtencion", atencion.idAtencion);

          let requestDetalle = await this.supabase
            .from(`Detalle${this.nombreTabla}`)
            .insert({
              idComprobante: idComprobante,
              idAtencion: atencion.idAtencion,
              cantidad: 1,
              precio: atencion.subtotal,
            })
            .single();

          if (requestDetalle.error) {
            errors.push(requestDetalle.error);
          }
      });

    }

    return errors;
  }

  async removeComprobante(comprobante: Comprobante) {
    let request = await this.supabase
      .from(`${this.nombreTabla}`)
      .update({ estado: false })
      .eq("idComprobante", comprobante.idComprobante)
      .single();

    return { data: request.data, error: request.error };
  }
  async getComprobantes(proveedor: Proveedor, params?: LazyLoadEvent) {
    let query = this.supabase
      .from<Comprobante>(`${this.nombreTabla}`)
      .select("*")
      .eq("idTipoComprobante", 1)
      .neq("saldo", 0)
      .eq("idProveedor", proveedor.idProveedor);

    if (params?.first !== undefined && params?.rows !== undefined) {
      query = query.range(params?.first, params?.first + params?.rows - 1);
    }

    if (params?.sortField !== undefined && params?.sortOrder !== undefined) {
      query = query.order(params.sortField as any, {
        ascending: params.sortOrder === 1,
      });
    }

    if (params?.globalFilter) {
      query = query.or(`or(numero.ilike.%${params.globalFilter}%)`);
    }
    let { data, error } = await query;
    return { data, error };
  }
}

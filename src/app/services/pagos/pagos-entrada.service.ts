import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { Comprobante } from "src/app/models/Comprobante";
import { DetallePago } from "src/app/models/DetallePago";
import { MetPago } from "src/app/models/MetPago";
import { Pago, PagoEntrada } from "src/app/models/Pago";
import { Proveedor } from "src/app/models/Proveedor";
import { SupabaseDepositoSeleccionadoService } from "../deposito-seleccionado/supabase-deposito-seleccionado.service";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class PagosEntradaService {
  supabase: SupabaseClient;
  constructor(
    private supabaseService: SupabaseService,
    private depositoService: SupabaseDepositoSeleccionadoService
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  public async getMetPago() {
    let { data: MetodosPago, error } = await this.supabase
      .from("MetodosPago")
      .select("idMetPago,nombre");
    return { MetodosPago, error };
  }

  async getCantPagos() {
    return await this.supabase
      .from<Pago>("PagoEntradaView")
      .select("idPago")
      .eq("estado", true);
  }

  async getPagos(params?: LazyLoadEvent) {
    let query = this.supabase.from<PagoEntrada>("PagoEntradaView").select("*").eq("estado",true);

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
        `or(nroComprobante.ilike.%${params.globalFilter}%,nombreProveedor.ilike.%${params.globalFilter}%,nombreMetodo.ilike.%${params.globalFilter}%)`
      );
    }
    let { data, error } = await query;
    return { data, error };
  }

  async insertPagos(
    idMetPago: number,
    detalles: Comprobante[],
    idObraSocial: number,
    total: number,
    nroComprobante: string
  ) {
    let request = await this.supabase
      .from("PagoEntrada")
      .insert({
        idObraSocial: idObraSocial,
        idMetPago: idMetPago,
        nroComprobante: nroComprobante,
        total: total,
        estado: true,
      })
      .single();
    if (request.data) {
      let idPago = request.data.idPago;
      detalles.forEach(async (detalle) => {
        let requestDetalle = await this.supabase
          .from("DetallePagoEntrada")
          .insert({
            idPago: idPago,
            idComprobante: detalle.idComprobante,
            importe: detalle.subTotal,
          })
          .single();
        if (requestDetalle.data) {
          let nuevoSaldo = detalle.saldo - detalle.subTotal;
          let requestComprobante = await this.supabase
            .from("ComprobanteEntrada")
            .update({ saldo: nuevoSaldo })
            .eq("idComprobante", detalle.idComprobante)
            .single();
        }
      });
    }
  }
  async getDetalles(idPago: number) {
    let requestDetalle = await this.supabase
      .from<DetallePago>("DetallePagoEntrada")
      .select(`idComprobante : idComprobante(numero,categoria),
      importe,
      fechaRegistro
      `)
      .eq("idPago", idPago);
    return requestDetalle;
  }
  async delete(idPago : number){
    let query = this.supabase.from<Pago>("PagoEntrada").update({estado:false}).eq("idPago",idPago);
    return query;
  }
  
}

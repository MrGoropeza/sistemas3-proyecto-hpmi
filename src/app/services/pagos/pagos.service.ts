import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { LazyLoadEvent } from "primeng/api";
import { Pago } from "src/app/models/Pago";
import { SupabaseDepositoSeleccionadoService } from "../deposito-seleccionado/supabase-deposito-seleccionado.service";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class PagosService {
  supabase: SupabaseClient;
  constructor(
    private supabaseService: SupabaseService,
    private depositoService: SupabaseDepositoSeleccionadoService
  ) {
    this.supabase = supabaseService.getSupabaseClient();
  }
  async getCantPagos() {
    return await this.supabase
      .from<Pago>("Pagos")
      .select("idPago")
      .eq("estado", true);
  }
  async getPagos(params?: LazyLoadEvent) {
    let query = this.supabase
      .from<Pago>("PagoView")
      .select("*")
      

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
}

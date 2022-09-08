import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { Articulo } from "src/app/models/articulo";
import { DetalleMovimiento } from "src/app/models/DetalleMovimiento";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class DetalleMovimientoService {

  private supabase : SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = supabaseService.getSupabaseClient();
  }

  public async getDetalleMovimiento(idmovimiento: number) {
    let { data: DetalleMovimiento, error } = await this.supabase
      .from<DetalleMovimiento>("DetalleMovimiento")
      .select(
        `
      idDetalle,
      articulo : idArticulo(nombre,descripcion),
      stock`
      )
      .eq("idMovimiento", idmovimiento);
    return { data: DetalleMovimiento, error };
  }

  async createDetalleMovimiento(idMovimiento: number, articulo: Articulo, stock: number){
    return await this.supabase.from("DetalleMovimiento")
      .insert({
        "idMovimiento": idMovimiento,
        "idArticulo": articulo.id,
        "stock": stock
      });
  }
}

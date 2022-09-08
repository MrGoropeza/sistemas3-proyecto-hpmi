import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { DetalleMovimiento } from "src/app/models/DetalleMovimiento";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class DetalleMovimientoService {
  constructor(private supabase: SupabaseService) {}
  public async getDetalleMovimiento(idmovimiento: number) {
    let { data: DetalleMovimiento, error } = await this.supabase
      .getSupabaseClient()
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
}

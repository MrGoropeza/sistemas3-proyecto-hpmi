import { Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { Comprobante } from "src/app/models/Comprobante";
import { DetalleComprobante } from "src/app/models/DetalleComprobante";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class ComprobantesService {
  constructor(private supabase: SupabaseService) {}
  public async getDetalle(id: number){
    let { data: DetalleComprobante, error } = await this.supabase.getSupabaseClient()
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
      .getSupabaseClient()
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
}

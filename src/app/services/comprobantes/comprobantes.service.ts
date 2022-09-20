import { Injectable } from "@angular/core";
import { from, map, Observable } from "rxjs";
import { Comprobante } from "src/app/models/Comprobante";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class ComprobantesService {
  constructor(private supabase: SupabaseService) {}
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

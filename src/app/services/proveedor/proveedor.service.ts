import { Injectable } from "@angular/core";
import { from, map, Observable, of } from "rxjs";
import { Proveedor, proveedorData } from "src/app/models/Proveedor";
import { SupabaseService } from "../supabase.service";

@Injectable({
  providedIn: "root",
})
export class ProveedorService {
  constructor(private supabase: SupabaseService) {}

  public getProveedores(): Observable<Proveedor[]> {
    const query = this.supabase
      .getSupabaseClient()
      .from<Proveedor>("Proveedor")
      .select("*")
      .eq("estado", true)
      .order("idProveedor", { ascending: true });
    return from(query).pipe(
      map((proveedores) => {
        if (proveedores.data) {
          return proveedores.body;
        } else {
          return [] as Proveedor[];
        }
      })
    );
  }
  update(id: number, proveedor: Proveedor): Observable<Proveedor> {
    const query = this.supabase
      .getSupabaseClient()
      .from<Proveedor>("Proveedor")
      .update({ ...proveedor })
      .eq("idProveedor", id)
      .single();
    return from(query).pipe(
      map((res) => {
        return res.body as Proveedor;
      })
    );
  }
  delete(id: number): Observable<Proveedor> {
    const query = this.supabase
      .getSupabaseClient()
      .from<Proveedor>("Proveedor")
      .update({ estado: false })
      .eq("idProveedor", id)
      .single();
    return from(query).pipe(
      map((res) => {
        return res.body as Proveedor;
      })
    );
  }
  public async insert(proveedor: proveedorData) {
    const { data, error } = await this.supabase
      .getSupabaseClient()
      .from<Proveedor>("Proveedor")
      .insert([
        {
          correo: proveedor.correo,
          nombre: proveedor.nombre,
          telefono: proveedor.telefono,
          domicilio: proveedor.domicilio,
        },
      ]);
    return { data, error };
  }
}

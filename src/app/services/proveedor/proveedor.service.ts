import { Injectable } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
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

  async getCantProveedores(){
    return await this.supabase.getSupabaseClient()
      .from("Proveedor").select("idProveedor").eq('estado', true);
  }

  async getProveedoresLazy(params?: LazyLoadEvent) {
    let query = this.supabase.getSupabaseClient()
      .from<Proveedor>("Proveedor")
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
        .or(`or(nombre.ilike.%${params.globalFilter}%,CUIT.ilike.%${params.globalFilter}%)`)
    }

    return query;
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
  public insert(proveedor: proveedorData): Observable<Proveedor> {
    const query = this.supabase
      .getSupabaseClient()
      .from<Proveedor>("Proveedor")
      .insert(
        {
          correo: proveedor.correo,
          nombre: proveedor.nombre,
          telefono: proveedor.telefono,
          domicilio: proveedor.domicilio,
          CUIT: proveedor.CUIT
        },
      )
      .single();
      return from(query).pipe(
        map((res) => res.body as Proveedor)
      );
  }
  public getProvis(){
    const Proveedor = this.supabase.getSupabaseClient()
  .from('Proveedor')
  .on('*', payload => {
    console.log('Change received!', payload)
  }).subscribe();
  return Proveedor;
  
  }
}

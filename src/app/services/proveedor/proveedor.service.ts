import { Injectable } from '@angular/core';
import { Proveedor, proveedorData } from 'src/app/models/Proveedor';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private supabase : SupabaseService) { }
  public async getProveedores(){
    let { data: Proveedor, error } = await this.supabase.getSupabaseClient()
  .from('Proveedor')
  .select('*');
  return { data: Proveedor, error };
  }
  public async insert(proveedor: proveedorData){
    const { data, error } = await this.supabase.getSupabaseClient()
  .from<Proveedor>('Proveedor')
  .insert([
    { 
      correo : proveedor.correo,
      nombre : proveedor.nombre,
      telefono : proveedor.telefono,
      domicilio : proveedor.domicilio
     }
  ]);
  return { data, error };
  }
}

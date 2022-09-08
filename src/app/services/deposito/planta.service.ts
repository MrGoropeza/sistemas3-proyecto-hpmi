import { Injectable } from '@angular/core';
import { Planta } from 'src/app/models/Planta';
import { SupabaseService } from '../supabase.service';


@Injectable({
  providedIn: 'root'
})
export class PlantaService {
plantas : Planta[] = [
];
  constructor(private supabase : SupabaseService) { }
  public async getPlantas(){
    let { data: Planta, error } = await this.supabase.getSupabaseClient()
  .from<Planta>('Planta')
  .select('idPlanta,nombre')
  .eq('estado',true)
  return  { data: Planta, error };
  }
  public async getId(nombre: string){
    let { data: Planta, error } = await this.supabase.getSupabaseClient()
    .from<Planta>('Planta')
    .select("idPlanta")
    .eq('nombre', nombre);
    return { data: Planta, error };
  }
  public async insert(planta: Planta){
    const { data, error } = await this.supabase.getSupabaseClient()
    .from<Planta>('Planta')
    .insert([{nombre : planta.nombre,estado : true}])
    return { data, error };
  }
  public async disable(idPlanta : number){
    const { data, error } = await this.supabase.getSupabaseClient()
    .from<Planta>('Planta')
    .update({ estado : false})
    .eq('idPlanta', idPlanta)
  }
  public async update(planta: Planta){
    const { data, error } = await this.supabase.getSupabaseClient()
  .from('Planta')
  .update({
    nombre : planta.nombre
  })
  .eq('idPlanta', planta.idPlanta)
  return { data, error };
}
}

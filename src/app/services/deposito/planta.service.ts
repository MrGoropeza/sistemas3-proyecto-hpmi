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
  return  { data: Planta, error };
  }
  public async getId(nombre: string){
    let { data: Planta, error } = await this.supabase.getSupabaseClient()
    .from<Planta>('Planta')
    .select("idPlanta")
    .eq('nombre', nombre);
    return { data: Planta, error };
  }
}

import { Injectable } from '@angular/core';
import { Sector } from '../../models/Sector';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  sectores : Sector[] = [];
    constructor(private servicioDatos : SupabaseService) { }
    public async getSector(){
      let { data: Sector, error } = await this.servicioDatos.getSupabaseClient()
    .from<Sector>('Sector')
    .select('idSector,nombre');
    return { data: Sector, error };
    }
    public async getId(nombre: string){
      let { data: Sector, error } = await this.servicioDatos.getSupabaseClient()
      .from<Sector>('Sector')
      .select("idSector")
      .eq('nombre', nombre);
      return { data: Sector, error };
    }
}

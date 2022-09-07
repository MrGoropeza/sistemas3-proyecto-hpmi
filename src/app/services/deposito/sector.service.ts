import { Injectable } from '@angular/core';
import { Planta } from 'src/app/models/Planta';
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
    .select('idSector,nombre')
    .eq('estado',true);
    return { data: Sector, error };
    }
    public async getNombrePlanta(sector : Sector){
      let { data: Sector, error } = await this.servicioDatos.getSupabaseClient()
      .from<Sector>('Sector')
      .select('idPlanta : idPlanta(nombre)')
      .eq('idSector',sector.idSector);
      return { data: Sector, error };
    }
    public async getSectorFull(){
      let { data: Sector, error } = await this.servicioDatos.getSupabaseClient()
    .from<Sector>('Sector')
    .select('idSector,nombre,idPlanta: idPlanta(nombre)')
    .eq('estado',true);
    return { data: Sector, error };
    }
    public async getId(nombre: string){
      let { data: Sector, error } = await this.servicioDatos.getSupabaseClient()
      .from<Sector>('Sector')
      .select("idSector")
      .eq('nombre', nombre);
      return { data: Sector, error };
    }
    public async insert(sector : Sector){
      const { data, error } = await this.servicioDatos.getSupabaseClient()
      .from<Sector>('Sector')
      .insert([{nombre : sector.nombre,estado : true, idPlanta : sector.idPlanta}])
      return { data, error };
    }
    public async disable(idSector : number){
      const { data, error } = await this.servicioDatos.getSupabaseClient()
      .from<Sector>('Sector')
      .update({ estado : false})
      .eq('idSector', idSector)
    }
    public async update(sector : Sector){
      const { data, error } = await this.servicioDatos.getSupabaseClient()
    .from('Sector')
    .update({
      nombre : sector.nombre
    })
    .eq('idSector', sector.idSector)
    return { data, error };
  }
}

import { Injectable } from '@angular/core';
import { IArticuloDepositoView } from 'src/app/models/IArticuloDeposito';
import { SupabaseService } from '../supabase.service';


@Injectable({
  providedIn: 'root'
})
export class ArticuloDeDepositoService {

  constructor(private supabase : SupabaseService) { }

  public async getArticulos(id : number){
    let { data: ArticuloDeposito, error } = await this.supabase.getSupabaseClient()
  .from<IArticuloDepositoView>('ArticuloDepositoView')
  .select('id : idArticulo,nombre : idArticulo(nombre),descripcion:idArticulo(descripcion),unidad:idArticulo(idUnidadArticulo (id, nombre, abreviacion)),stock')
  .eq('idDeposito',id)
  return { data: ArticuloDeposito, error };
  }
}

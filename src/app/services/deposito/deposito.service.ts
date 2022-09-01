import { Injectable } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { Deposito } from 'src/app/models/Deposito';
import { IDeposito } from 'src/app/models/IDeposito';
import { ITipoDeposito } from 'src/app/models/ITipoDeposito';
import { SupabaseService } from '../supabase.service';


@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  private deposito : IDeposito = {} as IDeposito;
  private depositos : IDeposito[] = [];
  //private tipoDepositos : ITipoDeposito[] = [];
  constructor(private servicioDatos : SupabaseService) { }

  public async insert(deposito : IDeposito){    
      const { data, error } = await this.servicioDatos.getSupabaseClient()
        .from('Deposito')
        .insert({idDeposito: deposito.idDeposito,
        idSector : deposito.sector.idSector,
        estado : true,
      idTipoDeposito : deposito.tipo.idTpoDeposito,
      idPlanta : deposito.planta.idPlanta
      })
      return { data, error };
    }
  public async update(deposito : IDeposito){
    const { data, error } = await this.servicioDatos.getSupabaseClient()
  .from('Deposito')
  .update({
    idSector : deposito.sector.idSector,
    idTipoDeposito : deposito.tipo.idTpoDeposito,
    idPlanta : deposito.planta.idPlanta
})
  .eq('idDeposito', deposito.idDeposito)
  return { data, error }
  }
  public async disable(deposito : IDeposito){
    const { data, error } = await this.servicioDatos.getSupabaseClient()
    .from<IDeposito>('Deposito')
    .update({ estado : false})
    .eq('idDeposito', deposito.idDeposito)
  }
  public async  getDepositos(){
    let { data: Deposito, error } = await this.servicioDatos.getSupabaseClient()
  .from<IDeposito>('Deposito')
  .select('idDeposito,sector:idSector(idSector,nombre),tipo:idTipoDeposito(idTpoDeposito,nombre),planta:idPlanta(idPlanta,nombre)')
  .eq("estado",true);
  return { data: Deposito, error };
  }
  public async  getTipoDepositos(){
    let { data: tipoDepositos, error } = await this.servicioDatos.getSupabaseClient()
    .from<ITipoDeposito>('TipoDeposito')
    .select('idTpoDeposito,nombre')
    .limit(10);
    return { tipoDepositos, error };
  }
  public async getIdTipoDeposito(nombre: string){
      let { data: TipoDeposito, error } = await this.servicioDatos.getSupabaseClient()
      .from<ITipoDeposito>('TipoDeposito')
      .select("idTpoDeposito")
      .eq('nombre', nombre);
      return { data: TipoDeposito, error };
  }
  public setDeposito(deposito : Deposito){
    this.deposito = deposito;
  }
  public getDeposito(){
    return this.deposito;
  }
  public limpiarDeposito(){
    this.deposito = {} as IDeposito;
  }
  public async getId(){
    let { data: Deposito, error } = await this.servicioDatos.getSupabaseClient()
  .from<IDeposito>('Deposito')
  .select('idDeposito')
  .order('idDeposito', { ascending: false })
  .limit(1)
  return { data: Deposito, error };
  }
}

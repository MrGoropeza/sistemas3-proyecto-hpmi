import { Injectable } from '@angular/core';
import { Deposito } from '../models/Deposito';
import { IDeposito } from '../models/IDeposito';
import { ITipoDeposito } from '../models/ITipoDeposito';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  private deposito : IDeposito = {} as IDeposito;
  private depositos : IDeposito[] = [
    {id : 1 , planta : "h1", sector:"quirofano", tipo :"Botiquin"},
    {id : 2 , planta : "h2", sector:"quirofano", tipo :"Botiquin"},
    {id : 3 , planta : "h3", sector:"quirofano", tipo :"Armario"},
    {id : 4 , planta : "h4", sector:"quirofano", tipo :"Botiquin"},
    {id : 5 , planta : "h5", sector:"quirofano", tipo :"Botiquin"},
    {id : 6 , planta : "h1", sector:"quirofano", tipo :"Botiquin"},
    {id : 7 , planta : "h1", sector:"quirofano", tipo :"Botiquin"},
    {id : 8 , planta : "h1", sector:"quirofano", tipo :"Botiquin"}
    
  ];
  private tipoDepositos : ITipoDeposito[] = [
    {nombre:"Auxiliar de Enfermero"},
    {nombre:"Armario"},
    {nombre:"Botiquin"},
  ];
  constructor() { }

  public getDepositos(){
    return this.depositos;
  }
  public getTipoDepositos(){
    return this.tipoDepositos;
  }
  public setDeposito(deposito : Deposito){
    this.deposito = deposito;
  }
  public getDeposito(){
    return this.deposito;
  }
}

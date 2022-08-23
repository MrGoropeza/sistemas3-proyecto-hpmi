import { Injectable } from '@angular/core';
import { IDeposito } from '../models/IDeposito';
import { ITipoDeposito } from '../models/ITipoDeposito';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  private depositos : IDeposito[] = [
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    {nombre :"deposito x" , planta : "h1", sector:"quirofano", tipo :"botiquin"},
    
  ];
  private tipoDepositos : ITipoDeposito[] = [
    {nombre:"Botiquin"},
    {nombre:"Armario"},
    {nombre:"Auxiliar de Enfermero"},
  ];
  constructor() { }

  public getDepositos(){
    return this.depositos;
  }
  public getTipoDepositos(){
    return this.tipoDepositos;
  }
}

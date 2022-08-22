import { Injectable } from '@angular/core';
import { IDeposito } from '../models/IDeposito';

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
  constructor() { }

  public getDepositos(){
    return this.depositos;
  }
}

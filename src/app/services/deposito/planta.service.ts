import { Injectable } from '@angular/core';
import { Planta } from '../../models/Planta';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
plantas : Planta[] = [
  {id: 1 , nombre:"H1"},
  {id: 2 , nombre:"H2"},
  {id: 3 , nombre:"H3"},
  {id: 3 , nombre:"H3"},
  {id: 3 , nombre:"H3"},
  {id: 3 , nombre:"H3"},
  {id: 3 , nombre:"H3"},
  {id: 3 , nombre:"H3"}
];
  constructor() { }
  getPlantas(){
    return this.plantas;
  }
}

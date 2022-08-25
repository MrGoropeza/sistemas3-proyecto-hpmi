import { Injectable } from '@angular/core';
import { Sector } from '../models/Sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  sectores : Sector[] = [
    {id: 1 , nombre:"quirofano"},
    {id: 2 , nombre:"sala"},
    {id: 3 , nombre:"habitación"}
  ];
    constructor() { }
    getSector(){
      return this.sectores;
    }
}

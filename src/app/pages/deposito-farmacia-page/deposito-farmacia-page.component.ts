import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';

@Component({
  selector: 'app-deposito-farmacia-page',
  templateUrl: './deposito-farmacia-page.component.html',
  styleUrls: ['./deposito-farmacia-page.component.css']
})
export class DepositoFarmaciaPageComponent implements OnInit {

  articulo!: Articulo;
  articulos: Articulo[] = [];
  articulosSeleccionados: Articulo[] = [];

  cantTotalArticulos!: number;
  idDepositoSeleccionado!: number;

  cargando!: boolean;
  dialog!: boolean;
  

  constructor() { }

  ngOnInit(): void {

  }

  onLazyLoad(event: LazyLoadEvent){

  }

  transferirArticulo(articulo: Articulo){

  }

  transferenciaRealizada(event: boolean){

  }

}

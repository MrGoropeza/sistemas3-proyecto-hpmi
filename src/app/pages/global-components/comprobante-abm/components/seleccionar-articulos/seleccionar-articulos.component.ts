import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';

@Component({
  selector: 'app-seleccionar-articulos',
  templateUrl: './seleccionar-articulos.component.html',
  styleUrls: ['./seleccionar-articulos.component.css']
})
export class SeleccionarArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  articulosSeleccionados: Articulo[] = [];
  cantTotalArticulos!: number;

  cargando: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLazyLoad(event: LazyLoadEvent){

  }

}

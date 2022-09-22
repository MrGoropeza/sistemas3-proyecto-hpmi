import { Component, Input, OnInit } from '@angular/core';
import { ArticuloView } from 'src/app/models/ArticuloView';

@Component({
  selector: 'app-setear-articulos',
  templateUrl: './setear-articulos.component.html',
  styleUrls: ['./setear-articulos.component.css']
})
export class SetearArticulosComponent implements OnInit {

  @Input() articulosSeleccionados: ArticuloView[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

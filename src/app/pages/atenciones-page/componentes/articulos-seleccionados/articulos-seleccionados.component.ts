import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';

@Component({
  selector: 'app-articulos-seleccionados',
  templateUrl: './articulos-seleccionados.component.html',
  styleUrls: ['./articulos-seleccionados.component.css']
})
export class ArticulosSeleccionadosComponent implements OnInit {

  @Input() articulosSeleccionados!: ArticuloMovimiento[];
  @Output() articulosSeleccionadosChange = new EventEmitter<ArticuloMovimiento[]>();

  @Output() seleccionarArticulo = new EventEmitter();
  @Output() quitarArticulo = new EventEmitter<ArticuloMovimiento>();

  @Output() subtotal = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  actualizarSubtotal() {
    let sub = 0;
    this.articulosSeleccionados.forEach(
      articulo => {
        if(articulo.cantidad && articulo.precio){
          sub += articulo.cantidad * articulo.precio;
        }
      }
    );
    this.subtotal.emit(sub);
  }

}

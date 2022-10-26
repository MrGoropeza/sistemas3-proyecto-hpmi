import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Prestacion, PrestacionAtencion } from 'src/app/models/prestacion';

@Component({
  selector: 'app-prestaciones-seleccionadas',
  templateUrl: './prestaciones-seleccionadas.component.html',
  styleUrls: ['./prestaciones-seleccionadas.component.css']
})
export class PrestacionesSeleccionadasComponent implements OnInit {

  @Input() prestacionesSeleccionadas!: PrestacionAtencion[];
  @Output() prestacionesSeleccionadasChange = new EventEmitter<PrestacionAtencion[]>();

  @Output() seleccionarPrestacion = new EventEmitter();
  @Output() quitarPrestacion = new EventEmitter<PrestacionAtencion>();

  @Output() subtotal = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  actualizarSubtotal() {
    let sub = 0;
    this.prestacionesSeleccionadas.forEach(
      prestacion => {
        if(prestacion.precio && prestacion.cantidad){
          sub += prestacion.precio * prestacion.cantidad;
        }
      }
    );
    this.subtotal.emit(sub);
  }
}

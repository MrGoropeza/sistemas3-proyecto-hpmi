import { Component, OnInit } from '@angular/core';
import { Movimiento } from 'src/app/models/Movimiento';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';

@Component({
  selector: 'app-movimiento-abm',
  templateUrl: './movimiento-abm.component.html',
  styleUrls: ['./movimiento-abm.component.css']
})
export class MovimientoABMComponent implements OnInit {
  public movimientos : Movimiento[]= [];
  public isVisible! : boolean;
  public titulo! : string;
  public movimientoSeleccionado : Movimiento = {} as Movimiento;

  cargando! : boolean;

  constructor(private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    this.getMovimientos();
  }
  public verDetalle(movimiento : Movimiento): void {
    this.isVisible = true;
    this.movimientoSeleccionado = movimiento;
    this.titulo ="Movimiento #"+movimiento.idMovimiento.toString();
  }
  public getMovimientos(){
    this.cargando = true;
    this.movimientoService.getMovimientos().then(
      (movimientos) => {
        if(movimientos.data){
          this.movimientos= movimientos.data;
          this.cargando = false;
        }
      },
      () => {this.cargando = false}
    );
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Movimiento } from 'src/app/models/Movimiento';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';

@Component({
  selector: 'app-movimiento-abm',
  templateUrl: './movimiento-abm.component.html',
  styleUrls: ['./movimiento-abm.component.css']
})
export class MovimientoABMComponent implements OnInit {
  public movimientos : Movimiento[]= [];
  cantMovimientos!: number;
  public isVisible! : boolean;
  public titulo! : string;
  public movimientoSeleccionado : Movimiento = {} as Movimiento;

  @Input() idDepositoSeleccionado!: number;

  @Output() depositoSeleccionado: EventEmitter<Movimiento> = new EventEmitter();

  cargando! : boolean;

  constructor(private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    // this.getMovimientos();
  }
  public verDetalle(movimiento : Movimiento): void {

    this.depositoSeleccionado.emit(movimiento);

    // this.isVisible = true;
    // this.movimientoSeleccionado = movimiento;
    // this.titulo ="Movimiento #"+movimiento.idMovimiento.toString();
  }

  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;
    let request = await this.movimientoService
      .getMovimientosLazy(event, this.idDepositoSeleccionado);

    let requestCant = await this.movimientoService
      .getCantMovimientos(this.idDepositoSeleccionado);

    if(requestCant.data){
      this.cantMovimientos = requestCant.data.length;
    }

    if(request.data){
      this.movimientos = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
      
    }


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

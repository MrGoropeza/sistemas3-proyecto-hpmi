import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { ITipoMovimiento } from "src/app/models/TipoMovimiento";

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css']
})
export class NuevoMovimientoComponent implements OnInit {

  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>();

  @Input() idDepositoSeleccionado!: number;

  
  confirmado: boolean = false;

  tiposMovimiento: ITipoMovimiento[] = [];

  idDepositoDestino! : number;

  formMovimiento = this.formBuilder.group({
    tipoMovimiento: [null, Validators.required],
    motivo: ["", Validators.required],
    deposito: ["", Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService
  ) { }

  ngOnInit(): void {
    this.setTiposMovimientos();
  }

  async setTiposMovimientos(){

    let requestEntrada = await this.movimientoService.getIdTipoEntrada();

    if(requestEntrada !== undefined){
      this.tiposMovimiento.push(
        {
          nombre: "Entrada", 
          id: requestEntrada
        }
      );
    }

    let requestSalida = await this.movimientoService.getIdTipoSalida();

    if(requestSalida !== undefined){
      this.tiposMovimiento.push(
        {
          nombre: "Salida", 
          id: requestSalida
        }
      );
    }

    this.tiposMovimiento.push(
      {
        nombre: "A otro depósito",
        id: 0
      }
    );
    
  }

  ocultarDialog(){
    this.dialog = false;
    this.confirmado = false;
    this.formMovimiento.reset();
    this.dialogChange.emit(false);
  }

  realizarMovimiento(){
    this.formMovimiento.markAllAsTouched();

    console.log(this.formMovimiento.controls);
    
  }

}

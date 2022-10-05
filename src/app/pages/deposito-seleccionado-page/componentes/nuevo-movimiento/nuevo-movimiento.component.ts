import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { ITipoMovimiento } from "src/app/models/TipoMovimiento";
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { articulosValidator, cantidadesValidator } from 'src/app/validators/CustomValidator';

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

  articulosVisible: boolean = false;
  articulosSeleccionados: ArticuloComprobante[] = [];

  formMovimiento = this.formBuilder.group({
    tipoMovimiento: [{} as ITipoMovimiento, Validators.required],
    cantArticulos: [0, [Validators.required, Validators.min(1)]],
    articulosValidos: [this.articulosSeleccionados, [cantidadesValidator()]],
    motivo: ["", Validators.required],
    deposito: ["", Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService
  ) { }

  ngOnInit(): void {
    this.setTiposMovimientos();
    this.formMovimiento.controls["deposito"].disable();
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
    this.formMovimiento.controls["deposito"].disable();
    this.dialogChange.emit(false);
  }

  tipoSeleccionado() {
    let movSeleccionado: ITipoMovimiento | null = this.formMovimiento.controls["tipoMovimiento"].value;

    if(movSeleccionado){
      if(movSeleccionado.id !== 0){
        this.formMovimiento.controls["deposito"].disable();
      }else{
        this.formMovimiento.controls["deposito"].enable();
      }
    }
  }

  agregarArticulo(){
    this.articulosVisible = true;
  }

  quitarArticulo(articulo: ArticuloComprobante){
    let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
    this.articulosSeleccionados = [];
    this.articulosSeleccionados = nuevoArray;
  }

  articuloSeleccionado(articulo: ArticuloComprobante){
    let encontrado = this.articulosSeleccionados.find((element) => element.id === articulo.id);

    
    
    if(encontrado === undefined){
      this.articulosSeleccionados.push(articulo);
      this.formMovimiento.controls["cantArticulos"].setValue(this.articulosSeleccionados.length);
      this.formMovimiento.controls['articulosValidos'].setValue(this.articulosSeleccionados);
    }else{
      let nuevoArray = this.articulosSeleccionados.filter(element => element.id !== articulo.id);
      nuevoArray.push(articulo);
      this.articulosSeleccionados = nuevoArray;
    }
  }

  realizarMovimiento(){
    this.formMovimiento.markAllAsTouched();

    if(!this.formMovimiento.controls["tipoMovimiento"].value?.id){
      this.formMovimiento.controls["tipoMovimiento"].setValue(null);
    }

    this.tipoSeleccionado();
    
  }

}

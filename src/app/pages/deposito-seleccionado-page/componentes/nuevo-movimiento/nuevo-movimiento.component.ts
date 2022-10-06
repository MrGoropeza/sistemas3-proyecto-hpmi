import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimientos/movimiento.service';
import { ITipoMovimiento } from "src/app/models/TipoMovimiento";
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { articulosValidator, cantidadesValidator } from 'src/app/validators/CustomValidator';
import { Deposito } from 'src/app/models/Deposito';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css']
})
export class NuevoMovimientoComponent implements OnInit {


  @Input() dialog!: boolean;
  @Output() dialogChange = new EventEmitter<boolean>();

  @Input() idDepositoSeleccionado!: number;
  
  @Output() movimientoRealizado = new EventEmitter<boolean>();

  
  confirmado: boolean = false;

  tiposMovimiento: ITipoMovimiento[] = [];

  idDepositoDestino! : number;

  articulosVisible: boolean = false;
  articulosSeleccionados: ArticuloMovimiento[] = [];

  depositosVisible: boolean = false;

  formMovimiento = this.formBuilder.group({
    tipoMovimiento: [{} as ITipoMovimiento, Validators.required],
    cantArticulos: [this.articulosSeleccionados.length, [Validators.required, Validators.min(1)]],
    articulosValidos: [this.articulosSeleccionados, cantidadesValidator()],
    motivo: ["", Validators.required],
    deposito: [this.idDepositoDestino, Validators.required]
  });

  mostrarArticulos: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private movimientoService: MovimientoService,
    private depSeleccionadoService: SupabaseDepositoSeleccionadoService
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
    this.mostrarArticulos = false;
    this.articulosSeleccionados = [];
    this.formMovimiento.reset();
    this.formMovimiento.controls["deposito"].disable();
    this.dialogChange.emit(false);
  }

  tipoSeleccionado() {
    let movSeleccionado: ITipoMovimiento | null = this.formMovimiento.controls["tipoMovimiento"].value;
    this.mostrarArticulos = true;

    this.articulosSeleccionados.forEach(
      art => art.cantidad = 0
    );

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
    this.formMovimiento.controls["cantArticulos"].setValue(this.articulosSeleccionados.length);
    this.formMovimiento.controls['articulosValidos'].setValue(this.articulosSeleccionados);
  }

  articuloSeleccionado(articulo: ArticuloMovimiento){
    let encontrado = this.articulosSeleccionados.find((element) => element.id === articulo.id);

    // console.log(this.formMovimiento.controls['tipoMovimiento'].value!.nombre === 'Entrada');
    // console.log(this.formMovimiento.controls['tipoMovimiento'].value!.nombre);
    
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

  depositoSeleccionado(deposito: Deposito){
    this.idDepositoDestino = deposito.idDeposito;
    this.formMovimiento.controls["deposito"].setValue(this.idDepositoDestino);
    this.depositosVisible = false;
    // console.log(`Deposito Seleccionado: ${deposito.idDeposito}`);
    
  }

  async realizarMovimiento(){
    this.formMovimiento.markAllAsTouched();

    this.formMovimiento.controls["cantArticulos"].setValue(this.articulosSeleccionados.length);
    this.formMovimiento.controls['articulosValidos'].setValue(this.articulosSeleccionados);
    
    
    if(this.formMovimiento.controls["tipoMovimiento"].value?.id === undefined){
      this.formMovimiento.controls["tipoMovimiento"].setValue(null);
    }

    this.confirmado = true;

    if(this.formMovimiento.valid){
      let tipo = this.formMovimiento.controls["tipoMovimiento"].value?.nombre;
      let motivo;
      if(this.formMovimiento.controls["motivo"].value){
        motivo = this.formMovimiento.controls["motivo"].value;
      }

      console.log(`Motivo dentro del componente: ${motivo}`);
      
      let request;
      if(tipo === "Salida"){
        request = await this.movimientoService.createSalida(
          this.idDepositoSeleccionado,
          this.articulosSeleccionados,
          motivo = motivo
        );
      }else if(tipo === "Entrada"){
        request = await this.movimientoService.createEntrada(
          this.idDepositoSeleccionado,
          this.articulosSeleccionados,
          motivo = motivo
        );
      }else{
        request = await this.movimientoService.createTransferencia(
          this.idDepositoSeleccionado, 
          this.idDepositoDestino, 
          this.articulosSeleccionados,
          motivo = motivo
        );
  
        
          
      }

      console.log(request);

      if(request.data){
        await this.sleep(4000);
        this.ocultarDialog();
        this.movimientoRealizado.emit(true);
      }

    }
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

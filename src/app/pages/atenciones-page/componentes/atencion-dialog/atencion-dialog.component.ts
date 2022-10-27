import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ArticuloMovimiento } from 'src/app/models/ArticuloMovimiento';
import { AtencionEncabezado, tipoAtencion } from 'src/app/models/AtencionDetalles';
import { Medico } from 'src/app/models/Medico';
import { Prestacion, PrestacionAtencion } from 'src/app/models/prestacion';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';
import { articulosValidator } from 'src/app/validators/CustomValidator';

@Component({
  selector: 'app-atencion-dialog',
  templateUrl: './atencion-dialog.component.html',
  styleUrls: ['./atencion-dialog.component.css']
})
export class AtencionDialogComponent implements OnInit {


  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange: EventEmitter<boolean> = new EventEmitter();

  tiposAtencion = [tipoAtencion[0], tipoAtencion[1], tipoAtencion[2]];
  articulosSeleccionados: ArticuloMovimiento[] = [];
  prestacionesSeleccionadas: PrestacionAtencion[] = [];
  
  confirmado: boolean = false;

  dialogMedicos: boolean = false;
  dialogPacientes: boolean = false;
  dialogArticulos: boolean = false;
  dialogPrestaciones: boolean = false;

  formAtencion = this.formBuilder.group({
    periodo: [null, Validators.required],
    tipoAtencion: ["", Validators.required],
    paciente: [null as any, Validators.required],
    medico: [null as any, Validators.required],
    sintomas: ["", Validators.required],
    diagnostico: ["", Validators.required],
    articulos: [this.articulosSeleccionados, articulosValidator()],
    prestaciones: [this.prestacionesSeleccionadas, articulosValidator()]
  });

  

  @Output() atencionCreada = new EventEmitter();
  subtotalArticulos: number = 0;
  subtotalPrestaciones: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private atencionService: AtencionService
  ) { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.confirmado = false;
    this.articulosSeleccionados = [];
    this.subtotalArticulos = 0;
    this.subtotalPrestaciones = 0;
    this.formAtencion.reset();
    this.dialogVisibleChange.emit(false);
  }

  async cargarAtencion() {
    this.confirmado = true;
    this.formAtencion.markAllAsTouched();

    if(this.formAtencion.invalid) {this.confirmado = false; return;}

    let fechaInicio = this.formAtencion.controls["periodo"].value ? this.formAtencion.controls["periodo"].value[0] as Date : "";
    let fechaFin = this.formAtencion.controls["periodo"].value ? this.formAtencion.controls["periodo"].value[1] as Date : "";
    let tipoAtencion = this.formAtencion.controls["tipoAtencion"].value ? this.formAtencion.controls["tipoAtencion"].value : "";
    let sintomas = this.formAtencion.controls["sintomas"].value ? this.formAtencion.controls["sintomas"].value : "";
    let diagnostico = this.formAtencion.controls["diagnostico"].value ? this.formAtencion.controls["diagnostico"].value : "";
    let idPaciente = this.formAtencion.controls["paciente"].value.idPaciente as number;
    let idMedico = this.formAtencion.controls["medico"].value.idMedico as number;

    let nuevaAtencion = {
      fechaInicio,
      fechaFin,
      tipoAtencion,
      sintomas,
      diagnostico,
      idPaciente,
      idMedico,
      subtotal: this.subtotalArticulos + this.subtotalPrestaciones
    }

    let request = await this.atencionService
      .createAtencion(
        nuevaAtencion, 
        this.articulosSeleccionados,
        this.prestacionesSeleccionadas
      );

    if(request.error || request.errorArticulos.length > 0 || request.errorPrestaciones.length > 0){
      console.log(); 
      this.confirmado = false; 
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al crear la atención, intente de nuevo."
      });
      return;
    }

    this.atencionCreada.emit();
    this.ocultarDialog();

    this.messageService.add({
      severity: "success",
      summary: "Éxito",
      detail: "Atención creada con éxito."
    });
  }

  quitarArticulo(articulo: ArticuloMovimiento) {
    this.articulosSeleccionados = this.articulosSeleccionados.filter(element => element.id != articulo.id);
    this.formAtencion.controls["articulos"].setValue(this.articulosSeleccionados);
  }

  articuloSeleccionado(articulo: ArticuloMovimiento) {
    this.articulosSeleccionados.push(articulo);
    this.formAtencion.controls["articulos"].setValue(this.articulosSeleccionados);
  }

  quitarPrestacion(prestacion: PrestacionAtencion){
    this.prestacionesSeleccionadas = this.prestacionesSeleccionadas.filter(element => element.codigo != prestacion.codigo);
    this.formAtencion.controls["prestaciones"].setValue(this.prestacionesSeleccionadas);
  }

  prestacionSeleccionada(prestacion: PrestacionAtencion){
    this.prestacionesSeleccionadas.push(prestacion);
    this.formAtencion.controls["prestaciones"].setValue(this.prestacionesSeleccionadas);
  }
    

}

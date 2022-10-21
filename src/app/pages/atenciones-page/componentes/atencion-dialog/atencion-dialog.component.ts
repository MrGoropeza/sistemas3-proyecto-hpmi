import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AtencionEncabezado, tipoAtencion } from 'src/app/models/AtencionDetalles';
import { Medico } from 'src/app/models/Medico';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';

@Component({
  selector: 'app-atencion-dialog',
  templateUrl: './atencion-dialog.component.html',
  styleUrls: ['./atencion-dialog.component.css']
})
export class AtencionDialogComponent implements OnInit {

  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange: EventEmitter<boolean> = new EventEmitter();

  tiposAtencion = [tipoAtencion[0], tipoAtencion[1], tipoAtencion[2]];
  
  confirmado: boolean = false;

  dialogMedicos: boolean = false;
  dialogPacientes: boolean = false;

  formAtencion = this.formBuilder.group({
    periodo: [null, Validators.required],
    tipoAtencion: ["", Validators.required],
    paciente: [null as any, Validators.required],
    medico: [null as any, Validators.required],
    sintomas: ["", Validators.required],
    diagnostico: ["", Validators.required],
    // articulos: [null, Validators.required],
    // prestaciones: [null, Validators.required]
  });

  @Output() atencionCreada = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private atencionService: AtencionService
  ) { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.confirmado = false;
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
      idMedico
    }

    let request = await this.atencionService.createAtencion(nuevaAtencion);

    if(request.error){
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
    

}

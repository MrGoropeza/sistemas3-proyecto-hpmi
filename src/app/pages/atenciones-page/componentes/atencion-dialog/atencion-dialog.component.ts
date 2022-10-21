import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { tipoAtencion } from 'src/app/models/AtencionDetalles';
import { Medico } from 'src/app/models/Medico';

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

  formAtencion = this.formBuilder.group({
    periodo: [null, Validators.required],
    tipoAtencion: ["", Validators.required],
    paciente: [null as any, Validators.required],
    medico: [null as any, Validators.required],
    sintomas: ["", Validators.required],
    diagnostico: ["", Validators.required],
    articulos: [null, Validators.required],
    prestaciones: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {

  }

  ocultarDialog(){
    this.confirmado = false;
    this.formAtencion.reset();
    this.dialogVisibleChange.emit(false);
  }

  cargarAtencion() {
    this.formAtencion.markAllAsTouched();
  }
    

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PacienteView } from 'src/app/models/Paciente';
import { PacienteService } from 'src/app/services/pacientes/paciente.service';

@Component({
  selector: 'app-seleccionar-paciente',
  templateUrl: './seleccionar-paciente.component.html',
  styleUrls: ['./seleccionar-paciente.component.css']
})
export class SeleccionarPacienteComponent implements OnInit {

  @Input() dialogVisible!: boolean;
  @Output() dialogVisibleChange = new EventEmitter<boolean>();

  pacientes!: PacienteView[];
  cantTotalPacientes!: number;
  
  cargando!: boolean;

  @Output() pacienteSeleccionado = new EventEmitter<PacienteView>();
 

  constructor(
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {

  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;

    let requestCant = await this.pacienteService.getCant();
    if(requestCant.data) {this.cantTotalPacientes = requestCant.data.length}

    let request = await this.pacienteService.getItems(event);
    if(request.data){this.pacientes = request.data}

    this.cargando = false;
  }

  seleccionarPaciente(paciente: PacienteView) {
    this.pacienteSeleccionado.emit(paciente);
    this.dialogVisibleChange.emit(false);
  }

}

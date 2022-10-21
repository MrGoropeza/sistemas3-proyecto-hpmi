import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Medico } from 'src/app/models/Medico';
import { MedicoService } from 'src/app/services/medicos/medico.service';

@Component({
  selector: 'app-seleccionar-medico',
  templateUrl: './seleccionar-medico.component.html',
  styleUrls: ['./seleccionar-medico.component.css']
})
export class SeleccionarMedicoComponent implements OnInit {

  @Input() dialogVisible: boolean = false;
  @Output() dialogVisibleChange: EventEmitter<boolean> = new EventEmitter();
  
  medicos!: Medico[];
  cantTotalMedicos!: number;
  cargando!: boolean;

  @Output() medicoSeleccionado = new EventEmitter<Medico>();


  constructor(
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {

  }
  
  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;

    let requestCant = await this.medicoService.getCantMedicos();
    if(requestCant.data) {this.cantTotalMedicos = requestCant.data.length;}
    
    let request = await this.medicoService.getMedicos(event);
    if(request.data) {this.medicos = request.data;}
    else{console.log(request.error);}

    this.cargando = false;
  }

  seleccionarMedico(medico: Medico) {
    this.medicoSeleccionado.emit(medico);
    this.dialogVisibleChange.emit(false);
  }

}

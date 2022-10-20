import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PacienteView } from 'src/app/models/Paciente';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/personas/persona.service';

@Component({
  selector: 'app-paciente-detalle-dialog',
  templateUrl: './paciente-detalle-dialog.component.html',
  styleUrls: ['./paciente-detalle-dialog.component.css']
})
export class PacienteDetalleDialogComponent implements OnInit {
  persona : Persona = {} as Persona;
  paciente : PacienteView = this.config.data.paciente;
  constructor(    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private personaService : PersonaService) { }

    ngOnInit(): void {
      this.getPersona();
    }
    private async getPersona() : Promise<void>{
      let request = await this.personaService.getPersona(this.paciente.idPersona);
      if (request.data) {
        this.persona = request.data; 
        console.log(this.persona);
        
      } else {
        console.log(request.error);
      }
    }
}

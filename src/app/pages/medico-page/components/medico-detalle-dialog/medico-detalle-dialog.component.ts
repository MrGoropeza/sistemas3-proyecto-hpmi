import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Medico } from 'src/app/models/Medico';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/personas/persona.service';

@Component({
  selector: 'app-medico-detalle-dialog',
  templateUrl: './medico-detalle-dialog.component.html',
  styleUrls: ['./medico-detalle-dialog.component.css']
})
export class MedicoDetalleDialogComponent implements OnInit {
  persona : Persona = {} as Persona;
  medico : Medico = this.config.data.medico;
  constructor(    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private personaService : PersonaService) { }

  ngOnInit(): void {
    this.getPersona();
  }
  private async getPersona() : Promise<void>{
    let request = await this.personaService.getPersona(this.medico.persona.idPersona);
    if (request.data) {
      this.persona = request.data; 
      console.log(this.persona);
      
    } else {
      console.log(request.error);
    }
  }


}

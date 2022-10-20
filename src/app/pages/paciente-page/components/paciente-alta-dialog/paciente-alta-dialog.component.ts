import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PacienteView } from 'src/app/models/Paciente';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { CustomValidator } from 'src/app/validators/CustomValidator';

@Component({
  selector: 'app-paciente-alta-dialog',
  templateUrl: './paciente-alta-dialog.component.html',
  styleUrls: ['./paciente-alta-dialog.component.css']
})
export class PacienteAltaDialogComponent implements OnInit {
  paciente : PacienteView = this.config.data.paciente;
  persona : Persona = {} as Persona;
  Form = this.formBuilder.group({
    nombre: [this.persona.nombre, Validators.required],
    apellido: [this.persona.apellido, Validators.required],
    telefono: [this.persona.telefono, Validators.required],
    correo: [this.persona.email, Validators.required],
    domicilio: [this.persona.domicilio, Validators.required],
    cuil: [
      this.persona.cuil,
      [Validators.required, Validators.pattern(CustomValidator)],
    ],
    dni: [this.persona.dni, Validators.required],
    fechaNacimiento: [this.persona.fechaNacimiento, Validators.required],
    fechaIngreso: [this.paciente.fechaIngreso, Validators.required],
  });
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private personaService: PersonaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPersona();
    console.log(this.paciente.idObraSocial);
    
  }
  public cerrar(){
    this.ref.close();
  }
  public guardar(){

  }
  private async getPersona() : Promise<void>{
    if(this.paciente.idPersona){
      let request = await this.personaService.getPersona(this.paciente.idPersona);
      if (request.data) {
        this.persona = request.data; 
        this.Form.patchValue(this.persona);
        this.Form.patchValue({
          correo : this.persona.email
        });
        console.log(this.persona);
        console.log(this.paciente);
        
        
      } else {
        console.log(request.error);
      }
    }
    }

}

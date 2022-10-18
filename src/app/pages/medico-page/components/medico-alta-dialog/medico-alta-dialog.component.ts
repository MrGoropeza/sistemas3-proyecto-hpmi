import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Medico } from "src/app/models/Medico";
import { Persona } from "src/app/models/Persona";
import { MedicoService } from "src/app/services/medicos/medico.service";
import { PersonaService } from "src/app/services/personas/persona.service";
import { CustomValidator } from "src/app/validators/CustomValidator";

@Component({
  selector: "app-medico-alta-dialog",
  templateUrl: "./medico-alta-dialog.component.html",
  styleUrls: ["./medico-alta-dialog.component.css"],
})
export class MedicoAltaDialogComponent implements OnInit {
  medico: Medico = this.config.data.medico;
  medicoForm = this.formBuilder.group({
    nombre: [this.medico.persona.nombre, Validators.required],
    apellido: [this.medico.persona.apellido, Validators.required],
    telefono: [this.medico.persona.telefono, Validators.required],
    correo: [this.medico.persona.email, Validators.required],
    domicilio: [this.medico.persona.domicilio, Validators.required],
    cuil: [
      this.medico.persona.cuil,
      [Validators.required, Validators.pattern(CustomValidator)],
    ],
    dni: [this.medico.persona.dni, Validators.required],
    especialidad: [this.medico.Especialidad, Validators.required],
    cargo: [this.medico.Cargo, Validators.required],
    fechaNacimiento: [this.medico.persona.fechaNacimiento, Validators.required],
  });
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private personaService: PersonaService,
    private medicoService: MedicoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPersona();
    // this.medicoForm.addControl("nombre",new FormControl("", Validators.required))
  }
  private async getPersona(){
    if(this.medico.persona.idPersona){
      await this.personaService.getPersona(this.medico.persona.idPersona).then((res)=>{
        if(res.data){
          this.medico.persona = res.data;
          this.medicoForm.patchValue(this.medico.persona);
          
        }else{
          console.log(res.error);
          
        }
      })
    }

  }
  cerrar() {
    this.ref.close();
  }
  guardar() {
    this.medico.Cargo = this.medicoForm.controls["cargo"].value || "";
    this.medico.Especialidad = this.medicoForm.controls["especialidad"].value || "";
    this.medico.persona.apellido = this.medicoForm.controls["apellido"].value || "";
    this.medico.persona.dni = this.medicoForm.controls["dni"].value || "";
    this.medico.persona.fechaNacimiento = this.medicoForm.controls["fechaNacimiento"].value || new Date();
    this.medico.persona.nombre = this.medicoForm.controls["nombre"].value || "";
    this.medico.persona.email = this.medicoForm.controls["correo"].value || "";
    this.medico.persona.domicilio = this.medicoForm.controls["domicilio"].value || "";
    this.medico.persona.telefono = this.medicoForm.controls["telefono"].value || "";
    this.medico.persona.cuil = this.medicoForm.controls["cuil"].value || "";
    console.log(this.medico);
    if (!this.medico.idMedico) {
      this.personaService.insert(this.medico.persona).then((res) => {
        if(res!=0){
          this.medico.persona.idPersona = res;
          this.medicoService.insert(this.medico).then((res) => {
            console.log(res);
            this.ref.close(res);
            this.messageService.add({
              severity: "success",
              summary: "Éxito",
              detail: "¡Medico registrado con exito!",
              life: 3000,
            });

          });
        }
      });
    } else {
      this.medicoService.update(this.medico).then((res) => {
        this.ref.close(this.medico);
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "¡Medico modificado con exito!",
          life: 3000,
        });
      });
    }
  }
}

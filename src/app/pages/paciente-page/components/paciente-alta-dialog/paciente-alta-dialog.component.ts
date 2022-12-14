import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { map } from "rxjs";
import { PacienteView } from "src/app/models/Paciente";
import { Persona } from "src/app/models/Persona";
import { PacienteService } from "src/app/services/pacientes/paciente.service";
import { PersonaService } from "src/app/services/personas/persona.service";
import {
  correoValidator,
  CustomValidator,
  dniValidator,
  telefonoValidator,
} from "src/app/validators/CustomValidator";
import { ObraSocialASeleccionarComponent } from "../obra-social-aseleccionar/obra-social-aseleccionar.component";

@Component({
  selector: "app-paciente-alta-dialog",
  templateUrl: "./paciente-alta-dialog.component.html",
  styleUrls: ["./paciente-alta-dialog.component.css"],
})
export class PacienteAltaDialogComponent implements OnDestroy, OnInit {
  paciente: PacienteView = this.config.data.paciente;
  genero: string[] = ["Masculino", "Femenino", "No Binario"];
  persona: Persona = this.config.data.persona;
  osref!: DynamicDialogRef;
  Form = this.formBuilder.group({
    nombre: [this.persona.nombre, Validators.required],
    apellido: [this.persona.apellido, Validators.required],
    telefono: [
      this.persona.telefono,
      [Validators.required, Validators.pattern(telefonoValidator)],
    ],
    dni: [
      this.persona.dni,
      [Validators.required, Validators.pattern(dniValidator)],
    ],
    correo: [
      this.persona.email,
      [Validators.required, Validators.pattern(correoValidator)],
    ],
    domicilio: [this.persona.domicilio, Validators.required],
    cuil: [
      this.persona.cuil,
      [Validators.required, Validators.pattern(CustomValidator)],
    ],
    fechaNacimiento: [this.persona.fechaNacimiento],
    fechaIngreso: [this.paciente.fechaIngreso, Validators.required],
    genero: [this.persona.Genero, Validators.required],
    nombreOS: [this.paciente.nombreObraSocial, Validators.required],
  });
  constructor(
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private personaService: PersonaService,
    private messageService: MessageService,
    private pacienteService: PacienteService
  ) {
    // this.getPersona();
    // console.log(this.paciente, this.persona);
  }

  ngOnDestroy(): void {
    // this.messageService.add({
    //   severity: "success",
    //   summary: "??xito",
    //   detail: "??Componente destruido con exito!",
    //   life: 3000,
    // });
  }

  ngOnInit(): void {
    console.log(this.paciente, this.persona);
  }
  public cerrar() {
    this.ref.close();
    this.Form.reset();
  }
  guardar() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      // this.paciente.idObraSocial = this.Form.controls["idObraSocial"].value || 0;
      this.paciente.fechaIngreso =
        this.Form.controls["fechaIngreso"].value || new Date();
      this.persona.apellido = this.Form.controls["apellido"].value || "";
      this.persona.dni = this.Form.controls["dni"].value || "";
      this.persona.fechaNacimiento =
        this.Form.controls["fechaNacimiento"].value || new Date();
      this.persona.email = this.Form.controls["correo"].value || "";
      this.persona.domicilio = this.Form.controls["domicilio"].value || "";
      this.persona.telefono = this.Form.controls["telefono"].value || "";
      this.persona.cuil = this.Form.controls["cuil"].value || "";
      this.persona.nombre = this.Form.controls["nombre"].value || "";
      this.persona.Genero = this.Form.controls["genero"].value || "";
      if (!this.paciente.idPaciente) {
        this.personaService.insert(this.persona).then((res) => {
          if (res != 0) {
            this.persona.idPersona = res;
            this.paciente.idPersona = this.persona.idPersona;
            this.pacienteService.insert(this.paciente).then((res) => {
              console.log(res);
              this.ref.close(res);
              this.messageService.add({
                severity: "success",
                summary: "??xito",
                detail: "??Paciente registrado con exito!",
                life: 3000,
              });
            });
          }
        });
      } else {
        console.log("update:", this.paciente, this.persona);
        this.pacienteService.update(this.paciente, this.persona).then((res) => {
          this.ref.close(this.paciente);
          this.messageService.add({
            severity: "success",
            summary: "??xito",
            detail: "??Paciente modificado con exito!",
            life: 3000,
          });
        });
      }
    }
    //  else {
    //   console.log(this.findInvalidControlsRecursive(this.Form));
    //   this.messageService.add({
    //     severity: "warn",
    //     summary: "Advertencia",
    //     detail: `${this.findInvalidControlsRecursive(this.Form)} ${
    //       this.Form.controls["cuil"].invalid
    //     } ${this.Form.controls["cuil"].touched}`,
    //     life: 3000,
    //   });
    // }
  }
  public findInvalidControlsRecursive(
    formToInvestigate: FormGroup | FormArray
  ): string[] {
    var invalidControls: string[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        if (control) {
          if (control.invalid) invalidControls.push(field);
        }
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }
  seleccionarObraSocial() {
    this.osref = this.dialogService.open(ObraSocialASeleccionarComponent, {
      header: "Seleccione una obra social",
      width: "70rem",
      height: "40rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
    });
    this.osref.onClose
      .pipe(
        map((res) => {
          if (res) {
            this.paciente.idObraSocial = res.idObraSocial;
            this.paciente.nombreObraSocial = res.nombre;
            this.Form.patchValue({ nombreOS: this.paciente.nombreObraSocial });
          }
        })
      )
      .subscribe();
  }
}

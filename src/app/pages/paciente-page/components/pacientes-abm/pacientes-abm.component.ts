import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { Paciente, PacienteView } from 'src/app/models/Paciente';
import { Persona } from 'src/app/models/Persona';
import { PacienteService } from 'src/app/services/pacientes/paciente.service';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { PacienteAltaDialogComponent } from '../paciente-alta-dialog/paciente-alta-dialog.component';
import { PacienteDetalleDialogComponent } from '../paciente-detalle-dialog/paciente-detalle-dialog.component';

@Component({
  selector: 'app-pacientes-abm',
  templateUrl: './pacientes-abm.component.html',
  styleUrls: ['./pacientes-abm.component.css']
})
export class PacientesABMComponent implements OnInit {
  pacientes: PacienteView[] = [];
  cantPacientes: Number = 0;
  persona! : Persona;
  total!: number;
  loading!: boolean;
  ref!: DynamicDialogRef;
  constructor(
    private personaService : PersonaService,
    private pacienteService : PacienteService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getItems();
  }
  public async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    let requestCant = await this.pacienteService.getCant();
    if (requestCant.data) {
      this.total = requestCant.data.length;
    }
    let request = await this.pacienteService.getItems(event);
    if (request.data) {
      this.pacientes = request.data;
      this.cantPacientes = this.pacientes.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
}
  public aniadir() {
    // let medico = {} as Medico;
    // medico.persona = {} as Persona;
    // console.log(medico);
    this.ref = this.dialogService.open(PacienteAltaDialogComponent,{
      header: "Añadir Paciente",
      width: "50rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { paciente : {} as PacienteView,persona : {} as Persona} 
    }
    );
    this.ref.onClose.pipe(
      map((res)=>{
        if(res){
          this.getItems();
        }
      })
    ).subscribe();
  }
  private async getPersona(idPersona : number): Promise<void> {
      let request = await this.personaService.getPersona(
        idPersona
      );
      if (request.data) {
        this.persona = request.data;
        console.log(this.persona);
        
      } else {
        console.log(request.error);
      }
    
  }

  public editar(paciente : PacienteView) {
    this.getPersona(paciente.idPersona).then((res)=>{
      this.ref = this.dialogService.open(PacienteAltaDialogComponent,{
        header: "Editar Paciente",
        width: "50rem",
        contentStyle: { overflow: "auto" },
        baseZIndex: 10000,
        data: { paciente : paciente, persona : this.persona} 
      })
      this.ref.onClose.pipe(
        map((res)=>{
          if(res){
            this.getItems();
          }
        })
      ).subscribe();

    } 
    );
  }
  public verDetalle(paciente : PacienteView) {
    this.ref = this.dialogService.open(PacienteDetalleDialogComponent, {
      header: `Historia Clinica del paciente`,
      width: "80%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { paciente : paciente },
    });
  }
  public eliminar(id : number) {
    this.confirmationService.confirm({
      message: "¿Estás seguro que desea borrar este paciente?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.pacienteService.delete(id).then(
          (res)=>{
            if(res.data){
              this.getItems();
            }
          }
        )

        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Paciente eliminado",
          life: 3000,
        });
      },
    });
  }
  public async getItems(): Promise<void> {
    let request = await this.pacienteService.getItems();
    if (request.data) {
      this.pacientes = request.data;
      console.log(this.pacientes);  
      this.total = this.pacientes.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }



}

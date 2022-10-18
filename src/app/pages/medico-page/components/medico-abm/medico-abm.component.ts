import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { Medico } from 'src/app/models/Medico';
import { MedicoService } from 'src/app/services/medicos/medico.service';
import { MedicoAltaDialogComponent } from '../medico-alta-dialog/medico-alta-dialog.component';
import { MedicoDetalleDialogComponent } from '../medico-detalle-dialog/medico-detalle-dialog.component';

@Component({
  selector: 'app-medico-abm',
  templateUrl: './medico-abm.component.html',
  styleUrls: ['./medico-abm.component.css']
})
export class MedicoABMComponent implements OnInit {
  medicos: Medico[] = [];
  cantMedicos: Number = 0;
  total!: number;
  loading!: boolean;
  ref!: DynamicDialogRef;
  constructor(
    private medicoService : MedicoService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }
  public async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    let requestCant = await this.medicoService.getCantMedicos();
    if (requestCant.data) {
      this.total = requestCant.data.length;
    }
    let request = await this.medicoService.getMedicos(event);
    if (request.data) {
      this.medicos = request.data;
      this.cantMedicos = this.medicos.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
  public aniadir() {
    this.ref = this.dialogService.open(MedicoAltaDialogComponent,{
      header: "Añadir Medico",
      width: "40rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { medico: {} as Medico} 
    }
    );
    this.ref.onClose.pipe(
      map((res)=>{
        if(res){
          this.medicos.push(res);
        }
      })
    ).subscribe();
  }
  public editar(medico : Medico) {
    // this.ref = this.dialogService.open(ClienteNuevoDialogComponent,{
    //   header: "Editar Proveedor",
    //   width: "40rem",
    //   contentStyle: { overflow: "auto" },
    //   baseZIndex: 10000,
    //   data: { cliente: cliente} 
    // })
    // this.ref.onClose.pipe(
    //   map((res)=>{
    //     if(res){
    //       this.getClientes();
    //     }
    //   })
    // ).subscribe();
  }
  public verDetalle(medico : Medico) {
    let nombre = medico.persona.apellido+', '+medico.persona.nombre;
    this.ref = this.dialogService.open(MedicoDetalleDialogComponent, {
      header: `${nombre}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { medico : medico },
    });
  }
  public eliminar(idMedico: number) {
    // this.confirmationService.confirm({
    //   message: "¿Estás seguro que desea borrar este cliente?",
    //   header: "Confirmar",
    //   icon: "pi pi-exclamation-triangle",
    //   acceptLabel: "Sí",
    //   rejectLabel: "No",
    //   accept: () => {
    //     this.clienteService.delete(idCliente).then(
    //       (res)=>{
    //         if(res.data){
    //           this.getClientes();
    //         }
    //       }
    //     )

    //     this.messageService.add({
    //       severity: "success",
    //       summary: "Éxito",
    //       detail: "Cliente eliminado",
    //       life: 3000,
    //     });
    //   },
    // });
  }
  public async getClientes(): Promise<void> {
    let request = await this.medicoService.getMedicos();
    if (request.data) {
      this.medicos = request.data;
      console.log(this.medicos);  
      this.total = this.medicos.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }


}

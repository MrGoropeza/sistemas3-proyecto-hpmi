import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';
import { ObraSocial } from 'src/app/models/ObraSocial';
import { ObraSocialService } from 'src/app/services/obraSociales/obra-social.service';
import { ObraSocialAltaDialogComponent } from '../obra-social-alta-dialog/obra-social-alta-dialog.component';

@Component({
  selector: 'app-obra-social-abm',
  templateUrl: './obra-social-abm.component.html',
  styleUrls: ['./obra-social-abm.component.css']
})
export class ObraSocialABMComponent implements OnInit {
  items: ObraSocial[] = [];
  cant: Number = 0;
  total!: number;
  loading!: boolean;
  ref!: DynamicDialogRef;
  constructor(
    private obraSocialService : ObraSocialService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getItems();
  }
  public async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    let requestCant = await this.obraSocialService.getCant();
    if (requestCant.data) {
      this.total = requestCant.data.length;
    }
    let request = await this.obraSocialService.getItems(event);
    if (request.data) {
      this.items = request.data;
      this.cant = this.items.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
}
  public aniadir() {
    let item = {} as ObraSocial;
    console.log(item);
    this.ref = this.dialogService.open(ObraSocialAltaDialogComponent,{
      header: "Añadir Obra Social",
      width: "50rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { item : item} 
    }
    );
    this.ref.onClose.pipe(
      map((res)=>{
          this.getItems();
      })
    ).subscribe();
  }
  public editar(item : ObraSocial) {
    this.ref = this.dialogService.open(ObraSocialAltaDialogComponent,{
      header: "Editar Obra Social",
      width: "50rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { item : item} 
    })
    this.ref.onClose.pipe(
      map((res)=>{
          this.getItems();
      })
    ).subscribe();
  }

  public eliminar(id : number) {
    console.log(id);
    
    this.confirmationService.confirm({
      message: "¿Estás seguro que desea borrar esta Obra Social?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.obraSocialService.delete(id).then(
          (res)=>{
            if(res.data){
              console.log(res.data);
              
              this.getItems();
            }
          }
        )

        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Obra Social eliminada",
          life: 3000,
        });
      },
    });
  }
  public async getItems(): Promise<void> {
    let request = await this.obraSocialService.getItems();
    if (request.data) {
      this.items = request.data;
      console.log(this.items);  
      this.total = this.items.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }



}

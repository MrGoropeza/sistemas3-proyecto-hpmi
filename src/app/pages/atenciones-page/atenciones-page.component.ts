import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Atencion, AtencionEncabezado, AtencionView } from 'src/app/models/AtencionDetalles';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';
import { AtencionDetalleDialogComponent } from './componentes/atencion-detalle-dialog/atencion-detalle-dialog.component';

@Component({
  selector: 'app-atenciones-page',
  templateUrl: './atenciones-page.component.html',
  styleUrls: ['./atenciones-page.component.css']
})
export class AtencionesPageComponent implements OnInit {
  
  atenciones: AtencionEncabezado[] = [];
  cantTotalAtenciones!: number;
  atencionesSeleccionadas: AtencionEncabezado[] = [];

  cargando: boolean = false;
  atencionDialog: boolean = false;
  ref!: DynamicDialogRef;
  constructor(
    private atencionService: AtencionService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;
    
    let requestCant = await this.atencionService.getCantAtenciones();
    if (requestCant.data) {this.cantTotalAtenciones = requestCant.data.length;}
    else {console.log(requestCant.error);}

    let request = await this.atencionService.getAtenciones(event);
    if(request.data){this.atenciones = request.data; console.log(this.atenciones);}
    else{console.log(request.error);}
    
    this.cargando = false;
  }

  editarAtencion(atencion: AtencionEncabezado) {
    
  }

  async borrarAtencion(atencion: AtencionEncabezado){
    let request = await this.atencionService.deleteAtencion(atencion);

    if(request.data){
      this.messageService.add({
        summary: "Éxito",
        detail: "Prestación eliminada con éxito.",
        severity: "success",
      });
      this.onLazyLoad({first: 0, rows: 5});
    }
  }

  borrarAtencionesSeleccionadas() {
    this.atencionesSeleccionadas.forEach(
      atencion => {
        this.borrarAtencion(atencion);
        this.atencionesSeleccionadas = this.atencionesSeleccionadas
          .filter(element => element.idAtencion !== atencion.idAtencion);
      }
    );
  }
  verDetalle(atencion : AtencionView){
    this.ref = this.dialogService.open(AtencionDetalleDialogComponent, {
      header: `Atención # ${atencion.idAtencion}`,
      width: "80%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { data : atencion },
    });
  }
  nuevaAtencion() {
    this.atencionDialog = true;
  }

}

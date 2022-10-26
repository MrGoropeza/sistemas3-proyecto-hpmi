import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Atencion, AtencionEncabezado } from 'src/app/models/AtencionDetalles';
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

  borrarAtencionesSeleccionadas() {
    
  }
  verDetalle(atencion : AtencionEncabezado){
    this.ref = this.dialogService.open(AtencionDetalleDialogComponent, {
      header: `Atención # ${atencion.idAtencion}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { data : atencion },
    });
  }
  nuevaAtencion() {
    this.atencionDialog = true;
  }

}

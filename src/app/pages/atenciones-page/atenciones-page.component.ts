import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { AtencionEncabezado } from 'src/app/models/AtencionDetalles';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';

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

  constructor(
    private atencionService: AtencionService,
    private messageService: MessageService
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

  nuevaAtencion() {
    this.atencionDialog = true;
  }

}

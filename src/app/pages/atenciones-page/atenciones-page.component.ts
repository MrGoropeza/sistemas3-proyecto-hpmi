import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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
    private atencionService: AtencionService
  ) { }

  ngOnInit(): void {
    
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;
    
    let requestCant = await this.atencionService.getCantAtenciones();
    if (requestCant.data) {this.cantTotalAtenciones = requestCant.data.length;}
    else {console.log(requestCant.error);}

    let request = await this.atencionService.getAtenciones(event);
    if(request.data){this.atenciones = request.data;}
    else{console.log(request.error);}
    
    this.cargando = false;
  }

  editarAtencion(atencion: AtencionEncabezado) {
    
  }

  borrarAtencionesSeleccionadas() {
    
  }

  nuevaAtencion() {
    this.atencionDialog = true;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AtencionEncabezado } from 'src/app/models/AtencionDetalles';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';

@Component({
  selector: 'app-seleccionar-atenciones',
  templateUrl: './seleccionar-atenciones.component.html',
  styleUrls: ['./seleccionar-atenciones.component.css']
})
export class SeleccionarAtencionesComponent implements OnInit {

  cargando: boolean = false;
  cantTotalAtenciones!: number;
  atenciones: AtencionEncabezado[] = [];

  @Input() idObraSocial!: number;

  @Input() atencionesSeleccionadas: AtencionEncabezado[] = [];

  @Output() atencionSeleccionada = new EventEmitter<AtencionEncabezado>;
  @Output() atencionQuitada = new EventEmitter<AtencionEncabezado>;

  constructor(
    private atencionService: AtencionService
  ) { }

  ngOnInit(): void {
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;
    let requestCant = await this.atencionService.getCantAtenciones(this.idObraSocial);
    if(requestCant.data){
      this.cantTotalAtenciones = requestCant.data.length;
    }

    let request = await this.atencionService.getAtenciones(event, undefined, undefined, this.idObraSocial);
    if(request.data){
      this.atenciones = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  seleccionarAtencion(atencion: AtencionEncabezado){
    this.atencionSeleccionada.emit(atencion);
  }

  atencionIsSelected(atencion: AtencionEncabezado){
    return this.atencionesSeleccionadas.findIndex(at => at.idAtencion === atencion.idAtencion) !== -1;
  }

  quitarAtencion(atencion: AtencionEncabezado){
    this.atencionQuitada.emit(atencion);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Prestacion, PrestacionAtencion } from 'src/app/models/prestacion';
import { PrestacionesService } from 'src/app/services/prestaciones/prestaciones.service';

@Component({
  selector: 'app-seleccionar-prestacion',
  templateUrl: './seleccionar-prestacion.component.html',
  styleUrls: ['./seleccionar-prestacion.component.css']
})
export class SeleccionarPrestacionComponent implements OnInit {

  prestaciones: PrestacionAtencion[] = [];

  cantTotalPrestaciones!: number;

  @Input() prestacionesSeleccionadas: PrestacionAtencion[] = [];

  @Output() prestacionSeleccionada = new EventEmitter<PrestacionAtencion>;
  @Output() prestacionQuitada = new EventEmitter<PrestacionAtencion>;

  cargando: boolean = false;

  constructor(
    private prestacionesService: PrestacionesService
  ) { }

  ngOnInit(): void {

  }

  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;

    let requestCant = await this.prestacionesService.getCantPrestaciones();
    if(requestCant.data){this.cantTotalPrestaciones = requestCant.data.length}
    else{console.log(requestCant.error)}

    let request = await this.prestacionesService.getPrestaciones(event);
    if(request.data){
      request.data.forEach(element => {
        this.prestaciones.push({...element, cantidad: 0} as PrestacionAtencion);
      });
    }
    else{console.log(request.error)}

    this.cargando = false;
  }

  seleccionarPrestacion(prestacion: PrestacionAtencion){
    this.prestacionSeleccionada.emit(prestacion);
  }


  prestacinoIsSelected(prestacion: Prestacion){
    return this.prestacionesSeleccionadas.findIndex(pres => pres.codigo === prestacion.codigo) !== -1;
  }

  quitarPrestacion(prestacion: PrestacionAtencion){
    this.prestacionQuitada.emit(prestacion);
  }

}

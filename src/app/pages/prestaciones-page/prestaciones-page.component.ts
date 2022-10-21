import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Prestacion } from 'src/app/models/prestacion';
import { PrestacionesService } from 'src/app/services/prestaciones/prestaciones.service';
import { entrada, seleccionarTodasPrestaciones } from './prestaciones.actions';

@Component({
  selector: 'app-prestaciones-page',
  templateUrl: './prestaciones-page.component.html',
  styleUrls: ['./prestaciones-page.component.css']
})
export class PrestacionesPageComponent implements OnInit, OnDestroy {

  prestaciones: Prestacion[] = [];
  // prestaciones$: Observable<Prestacion[]>;

  prestacion!: Prestacion;

  cantTotalPrestaciones!: number;

  prestacionesSeleccionadas: Prestacion[] = [];

  cargando: boolean = false;

  prestacionDialog: boolean = false;

  constructor(
    // private store: Store<{prestaciones: Prestacion[]}>,
    private prestacionesService: PrestacionesService,
    private messageService: MessageService
  ) { 
    // this.prestaciones$ = store.select("prestaciones");
  }

  ngOnInit(): void {
    // this.store.dispatch(entrada());
  }

  ngOnDestroy(): void {
    
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;

    let requestCant = await this.prestacionesService.getCantPrestaciones();

    if(requestCant.data){
      this.cantTotalPrestaciones = requestCant.data.length;
    }

    let request = await this.prestacionesService.getPrestaciones(event);

    if(request.data){
      this.prestaciones = request.data;
      this.cargando = false;
    }
  }

  nuevaPrestacion() {
    this.prestacionDialog = true;
  }

  nuevaPrestacionCargada(){
    this.onLazyLoad({first: 0, rows: 5});
  }

  editarPrestacion(prestacion: Prestacion) {
    this.prestacionDialog = true;
    this.prestacion = prestacion;
  }

  async eliminarPrestacion(prestacion: Prestacion) {
    let request = await this.prestacionesService.deletePrestacion(prestacion);

    if(request.data){
      this.messageService.add({
        summary: "Éxito",
        detail: "Prestación eliminada con éxito.",
        severity: "success",
      });
      this.onLazyLoad({first: 0, rows: 5});
    }
  }
  
  async borrarPrestacionesSeleccionadas() {
    let index: number = 0;
    while(index < this.prestacionesSeleccionadas.length){
      let request = await this.prestacionesService
        .deletePrestacion(this.prestacionesSeleccionadas[index]);
      if(request.error){
        this.messageService.add({
          summary: "Error",
          detail: "Error al eliminar las prestaciones.",
          severity: "error",
        });
        this.prestacionesSeleccionadas = [];
        this.onLazyLoad({first: 0, rows: 5});
        break;
      }
      index++;
    }
    this.prestacionesSeleccionadas = [];
    this.messageService.add({
      summary: "Éxito",
      detail: "Prestaciones eliminadas con éxito.",
      severity: "success",
    });
    this.onLazyLoad({first: 0, rows: 5});
  }
  

}

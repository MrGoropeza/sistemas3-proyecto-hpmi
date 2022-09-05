import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { UnidadArticulo } from 'src/app/models/unidadArticulo';
import { SupabaseUnidadesService } from 'src/app/services/categorias-unidades/supabase-unidades.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  cargando!: boolean;

  dialog!: boolean;

  unidad!: UnidadArticulo;

  unidades: UnidadArticulo[] = [];

  cantTotalUnidades!: number;

  unidadesSeleccionadas: UnidadArticulo[] = [];

  constructor(
    private supabaseService: SupabaseUnidadesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

  }

  async onLazyLoad(event?: LazyLoadEvent){
    this.cargando = true

    this.cantTotalUnidades = await this.supabaseService.getCantUnidades();

    let request = await this.supabaseService.readUnidades(event);

    if(request.data){
      this.unidades = request.data;
    }else{
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al obtener unidades de la base de datos. Intente de nuevo",
        life: 5000
      });
      console.log(request.error);
    }

    this.cargando = false;
  }

  nuevaUnidad(){
    this.dialog = true;
  }

  editarUnidad(unidad: UnidadArticulo){
    this.unidad = unidad;
    this.dialog = true;
  }

  unidadConfirmada(creando: boolean){
    this.onLazyLoad();
    if(creando){
      this.messageService.add(
        {severity:'success', 
        summary: 'Éxito',
        detail: 'Unidad Creada',
        life: 3000}
      );
    }else{
      this.messageService.add(
        {severity:'success', 
        summary: 'Éxito',
        detail: 'Unidad Actualizada',
        life: 3000}
      );
    }
  }

  eliminarUnidad(unidad: UnidadArticulo){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar \"' + unidad.nombre + '\"?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: async () => {
        let request = await this.supabaseService.deleteUnidad(unidad);
        if(request.data){
          this.messageService.add({
            severity:'success',
            summary: 'Éxito', 
            detail: 'Unidad eliminada', 
            life: 3000,
          });
          this.onLazyLoad()
        }else{
          console.log(request.error);
          this.messageService.add({
            severity:'error',
            summary: 'Error', 
            detail: 'Error al eliminar la unidad. Intente de nuevo.', 
            life: 3000,
          });
        }
      },
    });
  }

  borrarUnidadesSeleccionadas(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar las ' + this.unidadesSeleccionadas.length + ' unidades seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: async () => {
        this.unidadesSeleccionadas.forEach(
          async (item) => await this.supabaseService.deleteUnidad(item)
        );
        this.messageService.add({
          severity:'success',
          summary: 'Éxito', 
          detail: 'Unidades eliminadas', 
          life: 3000,
        });
        this.onLazyLoad()
      },
    });
  }

}

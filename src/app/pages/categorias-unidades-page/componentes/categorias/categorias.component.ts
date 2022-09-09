import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { CategoriaArticulo } from 'src/app/models/categoriaArticulo';
import { SupabaseCategoriasService } from 'src/app/services/categorias-unidades/supabase-categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  cargando!: boolean;

  dialog!: boolean;

  categoria!: CategoriaArticulo;

  categorias: CategoriaArticulo[] = [];

  cantTotalCategorias!: number;

  categoriasSeleccionadas: CategoriaArticulo[] = [];

  constructor(
    private supabaseService: SupabaseCategoriasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

  }

  async onLazyLoad(event?: LazyLoadEvent){
    this.cargando = true

    this.categorias = [];

    this.cantTotalCategorias = await this.supabaseService.getCantCategorias();

    let categoriasRequest = await this.supabaseService.readCategorias(event);

    if(categoriasRequest.data){
      this.categorias = categoriasRequest.data;
    }else{
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al obtener categorías de la base de datos. Intente de nuevo",
        life: 5000
      });
      console.log(categoriasRequest.error);
    }

    this.cargando = false;
  }

  nuevaCategoria(){
    this.dialog = true;
  }

  editarCategoria(categoria: CategoriaArticulo){
    this.categoria = categoria;
    this.dialog = true;
  }

  categoriaConfirmada(creando: boolean){
    this.onLazyLoad();
    if(creando){
      this.messageService.add(
        {severity:'success', 
        summary: 'Éxito',
        detail: 'Categoría Creada',
        life: 3000}
      );
    }else{
      this.messageService.add(
        {severity:'success', 
        summary: 'Éxito',
        detail: 'Categoría Actualizada',
        life: 3000}
      );
    }
  }

  eliminarCategoria(categoria: CategoriaArticulo){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar \"' + categoria.nombreCategoria + '\"?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: async () => {
        let request = await this.supabaseService.deleteCategoria(categoria);
        if(request.data){
          this.onLazyLoad();
          this.messageService.add({
            severity:'success',
            summary: 'Éxito', 
            detail: 'Categoría eliminada', 
            life: 3000,
          });
          this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c.id === categoria.id);
          this.onLazyLoad()
        }else{
          console.log(request.error);
          this.messageService.add({
            severity:'error',
            summary: 'Error', 
            detail: 'Error al eliminar la categoría. Intente de nuevo.', 
            life: 3000,
          });
        }
      },
    });
  }

  borrarCategoriasSeleccionadas(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que querés borrar las ' + this.categoriasSeleccionadas.length + ' categorías seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sí",
      rejectLabel: "No", 
      accept: async () => {
        
        this.categoriasSeleccionadas.forEach(
          async (cat) => {
            await this.supabaseService.deleteCategoria(cat);
            this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c.id === cat.id);
          }
        );
        this.onLazyLoad();
        this.messageService.add({
          severity:'success',
          summary: 'Éxito', 
          detail: 'Categorías eliminadas', 
          life: 3000,
        });
        this.onLazyLoad()
      },
    });
  }

}

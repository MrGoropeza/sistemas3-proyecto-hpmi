import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { categoriaArticulo } from 'src/app/models/categoriaArticulo';
import { CategoriaUnidadesService } from 'src/app/services/categorias-unidades/supabase-categorias-unidades.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  cargando!: boolean;

  dialog!: boolean;

  categoria!: categoriaArticulo;

  categorias: categoriaArticulo[] = [];

  cantTotalCategorias!: number;

  categoriasSeleccionadas: categoriaArticulo[] = [];

  constructor(
    private supabaseService: CategoriaUnidadesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  async onLazyLoad(event?: LazyLoadEvent){
    this.cargando = true

    this.cantTotalCategorias = await this.supabaseService.getCantCategorias();

    let categoriasRequest = await this.supabaseService.readCategorias(event);

    if(categoriasRequest.data){
      this.categorias = categoriasRequest.data;
    }else{
      this.messageService.add({
        severity: "warning",
        summary: categoriasRequest.error?.hint,
        life: 5000
      });
      console.log(categoriasRequest.error);
    }

    this.cargando = false;
  }

  nuevaCategoria(){
    this.dialog = true;
  }

  editarCategoria(categoria: categoriaArticulo){
    this.categoria = categoria;
    this.dialog = true;
  }

  categoriaConfirmada(categoria: categoriaArticulo){
    this.onLazyLoad();
  }

  eliminarCategoria(categoria: categoriaArticulo){

  }

  borrarCategoriasSeleccionadas(){

  }

}

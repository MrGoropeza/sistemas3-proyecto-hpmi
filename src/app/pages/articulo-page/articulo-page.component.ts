import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { categoriaArticulo } from 'src/app/models/categoriaArticulo';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-articulo-page',
  templateUrl: './articulo-page.component.html',
  styleUrls: ['./articulo-page.component.css']
})
export class ArticuloPageComponent implements OnInit {

  articulos: Articulo[] = [];

  articulosSeleccionados: Articulo[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private toastService: MessageService
  ) { }

  ngOnInit(): void {
    let categorias = [
      new categoriaArticulo().setId(0).setNombre("Medicamento"),
      new categoriaArticulo().setId(1).setNombre("Botiquín"),
      new categoriaArticulo().setId(2).setNombre("Utensilio"),
    ];

    for (let index = 0; index < 50; index++) {
      this.articulos.push(
        new Articulo()
          .setId(index)
          .setNombre(`producto${index}`)
          .setCategoria(categorias[Math.floor(Math.random() * 3)])
          .setFechaVencimiento(new Date(`08-${index}-2022`))
          .setDescripcion(`descripcion del producto${index}`)
      );
    }
    

  }

  nuevoArticulo(){

  }

  borrarArticulosSeleccionados(){

  }

  editarArticulo(){

  }

}

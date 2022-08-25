import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  articulo!: Articulo;

  articuloDialog: boolean = false;

  confirmado: boolean = false;

  categorias: categoriaArticulo[] = [];

  estados = [
      {label: 'EN STOCK', value: 'instock', severity: 'success'},
      {label: 'POCO STOCK', value: 'lowstock', severity: 'warning'},
      {label: 'SIN STOCK', value: 'outofstock', severity: 'danger'}
  ];

  constructor(
    private supabaseService: SupabaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.articulo = new Articulo();

    this.categorias = [
      new categoriaArticulo().setId(0).setNombre("Medicamento"),
      new categoriaArticulo().setId(1).setNombre("Botiquín"),
      new categoriaArticulo().setId(2).setNombre("Utensilio"),
    ];

    for (let index = 0; index < 50; index++) {
      this.articulos.push(
        new Articulo()
          .setId(index)
          .setNombre(`producto${index}`)
          .setCategoria(this.categorias[Math.floor(Math.random() * 3)])
          .setFechaVencimiento(new Date(`08-${Math.floor(Math.random() * 30) + 1}-2022`))
          .setDescripcion(`descripcion del producto${index}`)
          .setEstadoStock("lowstock")
      );
    }
    

  }

  ocultarDialog(){
    this.articuloDialog = false;
  }

  nuevoArticulo(){
    this.articuloDialog = true;
    
  }

  cargarArticulo(){
    this.confirmado = true;

    if(this.articulo.nombre != null){
      if (this.articulo.nombre.trim()) {
        if (this.articulo.id) {
          this.articulos[this.encontrarIndexPorId(this.articulo.id)] = this.articulo;
          this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Producto Actualizado', life: 3000});
        }
        else {
          this.articulo.id = Math.floor(Math.random() * 50) + 50;
          this.articulos.push(this.articulo);
          this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Producto Creado', life: 3000});
        }

        this.articulos = [...this.articulos];
        this.articuloDialog = false;
        this.articulo = new Articulo();
      }
    }

  }

  buscarSeverityEstado(estado: string): string | undefined{
    return this.estados.find(value => value.value === estado)?.severity;
  }

  buscarLabelEstado(estado: string): string | undefined{
    return this.estados.find(value => value.value === estado)?.label;
  }

  encontrarIndexPorId(id: number): number {
    let index = -1;
    for (let i = 0; i < this.articulos.length; i++) {
        if (this.articulos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

  editarArticulo(articulo: Articulo){
    this.articulo = articulo; 
    this.articuloDialog = true;
  }

  borrarArticulosSeleccionados(){
    this.confirmationService.confirm({
        message: '¿Estás seguro que queres eliminar los productos seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
            this.articulos = this.articulos.filter(val => !this.articulosSeleccionados.includes(val));
            this.articulosSeleccionados = [];
            this.messageService.add({
              severity:'success', 
              summary: 'Éxito', 
              detail: 'Artículos eliminados', life: 3000
            });
        }
    });
  }

  eliminarArticulo(articulo: Articulo){
    this.confirmationService.confirm({
        message: '¿Estás seguro que querés borrar \"' + articulo.nombre + '\"?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Sí",
        rejectLabel: "No", 
        accept: () => {
            this.articulos = this.articulos.filter(val => val.id !== articulo.id);
            this.articulo = new Articulo();
            this.messageService.add({
              severity:'success',
              summary: 'Éxito', 
              detail: 'Articulo eliminado', 
              life: 3000,
            });
        }
    });
  }

}

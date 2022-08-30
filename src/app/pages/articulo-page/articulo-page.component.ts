import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { categoriaArticulo } from 'src/app/models/categoriaArticulo';
import { unidadArticulo } from 'src/app/models/unidadArticulo';
import { SupabaseArticulosService } from 'src/app/services/articulos/supabase-articulos.service';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-articulo-page',
  templateUrl: './articulo-page.component.html',
  styleUrls: ['./articulo-page.component.css']
})
export class ArticuloPageComponent implements OnInit {


  cargando: boolean = true;

  cantTotalArticulos!: number;

  articulos: Articulo[] = [];

  articulosSeleccionados: Articulo[] = [];

  articulo!: Articulo;

  articuloDialog: boolean = false;

  confirmado: boolean = false;

  categorias: categoriaArticulo[] = [];

  unidades: unidadArticulo[] = [];

  estados = [
      {label: 'EN STOCK', value: 'instock', severity: 'success'},
      {label: 'POCO STOCK', value: 'lowstock', severity: 'warning'},
      {label: 'SIN STOCK', value: 'outofstock', severity: 'danger'}
  ];

  constructor(
    private supabaseService: SupabaseArticulosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private localeService: LocaleService,
  ) { }

  ngOnInit(): void {
    this.localeService.setEspaniol();
    this.articulo = new Articulo();
    // this.categorias = [
    //   new categoriaArticulo().setId(0).setNombre("Medicamento"),
    //   new categoriaArticulo().setId(1).setNombre("Botiquín"),
    //   new categoriaArticulo().setId(2).setNombre("Utensilio"),
    // ];

    // for (let index = 0; index < 50; index++) {
    //   this.articulos.push(
    //     new Articulo()
    //       .setId(index + 1)
    //       .setNombre(`producto${index}`)
    //       .setCategoria(this.categorias[Math.floor(Math.random() * this.categorias.length)])
    //       .setFechaVencimiento(new Date(`08-${Math.floor(Math.random() * 30) + 1}-2022`))
    //       .setDescripcion(`descripcion del producto${index}`)
    //       .setEstadoStock("lowstock")
    //   );
    // }
    

  }

  onLazyLoad(event: LazyLoadEvent){
    // console.log(event);
    this.cargando = true;

    this.supabaseService.readCategorias()
      .then(
        (response) => {
          if(response.data){
            this.categorias = response.data;
          }
        },
        () => {
          this.messageService.add(
            {
              severity:'danger', 
              summary: 'Error', 
              detail: 'Error al leer categorías de la base de datos. Intente nuevamente.', 
              life: 3000}
            );
        }
      );

    this.supabaseService.readUnidades()
      .then(
        (response) => {
          if(response.data){
            this.unidades = response.data;
          }
        },
        () => {
          this.messageService.add(
            {
              severity:'danger', 
              summary: 'Error', 
              detail: 'Error al leer categorías de la base de datos. Intente nuevamente.', 
              life: 3000}
            );
        }
      );

    this.supabaseService.getCantArticulos()
      .then(
        response => {
          if(response.data){
            this.cantTotalArticulos = response.data.length;
          }
        }
      );

    
    this.supabaseService.readArticulos(event)
        .then(
          (response) => {
            if(response.data != null){
              this.articulos = [];

              response.data.forEach(
                element => {
                  let mes = element.fechaVencimiento.toString().substring(5,7);
                  let anio = element.fechaVencimiento.toString().substring(0,4);
                  let dia = element.fechaVencimiento.toString().substring(8,10);
                  element.fechaVencimiento = new Date(`${mes}-${dia}-${anio}`);
                  this.articulos.push(element)
                }
              );
              this.cargando = false;
            }
          },
          (error) => console.log(error)
        );
  }

  ocultarDialog(){
    this.articulo = new Articulo();
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
          this.updateArticulo();
        }
        else {
          this.createArticulo();
        } 
      }
    }
  }

  createArticulo(){
    this.supabaseService.createArticulo(this.articulo)
      .then(
        (response) => {
          if(response.data){
            this.articulo.id = response.data[0].id;
          }
          this.articulos.push(this.articulo);
          this.articulos = [...this.articulos];
          
          this.articuloDialog = false;
          this.articulo = new Articulo();
          this.confirmado = false;
          this.messageService.add(
            {
              severity:'success', 
              summary: 'Éxito', 
              detail: 'Producto Creado', 
              life: 3000}
          );
        },
        () => {
          this.messageService.add(
            {
              severity:'danger', 
              summary: 'Error', 
              detail: 'El producto no se pudo crear. Intente nuevamente.', 
              life: 3000}
            );
        }
      );
  }

  updateArticulo(){
    this.supabaseService.updateArticulo(this.articulo)
      .then(
        (response) => {
          this.messageService.add(
            {severity:'success', 
            summary: 'Éxito',
            detail: 'Producto Actualizado',
            life: 3000}
          );
            if(response.data){
              this.articulo.id = response.data[0].id;
            }
            this.articulos[this.encontrarIndexPorId(this.articulo.id)] = this.articulo;
            this.articuloDialog = false;
            this.articulo = new Articulo();
            this.confirmado = false;
            
        },
        () => {
          this.messageService.add(
            {
              severity:'danger', 
              summary: 'Error', 
              detail: 'El producto no se pudo crear. Intente nuevamente.', 
              life: 3000}
            );
        }
      );
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
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Sí",
        rejectLabel: "No",
        accept: () => {
            this.articulos = this.articulos.filter(val => !this.articulosSeleccionados.includes(val));
            this.articulosSeleccionados.forEach(async art => {
              await this.supabaseService.deleteArticulo(art);
            });
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
            this.supabaseService.deleteArticulo(articulo)
              .then(
                () => {
                  this.messageService.add({
                    severity:'success',
                    summary: 'Éxito', 
                    detail: 'Articulo eliminado', 
                    life: 3000,
                  });
                },
                () => {
                  this.messageService.add({
                    severity:'danger',
                    summary: 'Error', 
                    detail: 'El artículo no se elimino, intente de nuevo', 
                    life: 3000,
                  });
                }
              );
            this.articulo = new Articulo();
            
        }
    });
  }

}

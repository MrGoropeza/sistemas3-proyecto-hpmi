import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { Articulo } from 'src/app/models/articulo';
import { CategoriaArticulo } from 'src/app/models/categoriaArticulo';
import { UnidadArticulo } from 'src/app/models/unidadArticulo';
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
  
  articulo: Articulo = new Articulo();
  
  articuloDialog: boolean = false;
  
  formArticulo: FormGroup = this.formBuilder.group(
    {
      nombre: [this.articulo.nombre, Validators.required],
      descripcion: [this.articulo.descripcion, Validators.required],
      unidad: [this.articulo.unidad, Validators.required],
      stock: [this.articulo.stock, [Validators.required, Validators.min(0)]],
      categoria: [this.articulo.categoria, Validators.required],
      fechaVencimiento: [this.articulo.fechaVencimiento, Validators.required]
    }
  );

  confirmado: boolean = false;

  categorias: CategoriaArticulo[] = [];

  unidades: UnidadArticulo[] = [];

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
    private formBuilder: FormBuilder
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
            // console.log(response.data);
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
              detail: 'Error al leer unidades de la base de datos. Intente nuevamente.', 
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

    this.supabaseService.readArticulosView(event);
    
    this.supabaseService.readArticulosView(event)
        .then(
          (response) => {
            if(response.data != null){
              this.articulos = [];

              // console.log(response);
              response.data.forEach(
                element => {
                  let mes = element.fechaVencimiento.toString().substring(5,7);
                  let anio = element.fechaVencimiento.toString().substring(0,4);
                  let dia = element.fechaVencimiento.toString().substring(8,10);
                  element.fechaVencimiento = new Date(`${mes}-${dia}-${anio}`);
                  let art = new Articulo();
                  art.id = element.id;
                  art.nombre = element.nombre;
                  art.descripcion = element.descripcion;
                  art.estado = element.estado;
                  art.stock = element.stock;
                  art.fechaVencimiento = element.fechaVencimiento;

                  let cat = new CategoriaArticulo();
                  cat.id = element.idCategoriaArticulo;
                  cat.nombreCategoria = element.nombreCategoria;

                  let un = new UnidadArticulo();
                  un.id = element.idUnidadArticulo;
                  un.nombre = element.nombreUnidad;
                  un.abreviacion = element.abreviacionUnidad;

                  art.categoria = cat;
                  art.unidad = un;

                  this.articulos.push(art);
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
    this.formArticulo.reset();
  }

  nuevoArticulo(){
    this.articuloDialog = true;
  }

  cargarArticulo(){
    this.confirmado = true;

    if(this.formArticulo.valid){
      this.articulo.nombre = this.formArticulo.controls['nombre'].value;
      this.articulo.descripcion = this.formArticulo.controls['descripcion'].value;
      this.articulo.categoria = this.formArticulo.controls['categoria'].value;
      this.articulo.fechaVencimiento = this.formArticulo.controls['fechaVencimiento'].value;
      this.articulo.unidad = this.formArticulo.controls['unidad'].value;
      this.articulo.stock = this.formArticulo.controls['stock'].value;

      if(this.articulo.nombre != null){
        if (this.articulo.id) {
          this.updateArticulo();
          
        }
        else {
          this.createArticulo();
          
        } 
      }
    }else{
      this.confirmado = false;
    }
    
  }

  createArticulo(){
    this.supabaseService.createArticulo(this.articulo)
      .then(
        (response) =>{
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
              detail: 'Artículo Creado', 
              life: 3000}
          );
          this.formArticulo.reset();
        },
        async () => {
          this.messageService.add(
            {
              severity:'danger', 
              summary: 'Error', 
              detail: 'El artículo no se pudo crear. Intente nuevamente.', 
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
            detail: 'Artículo Actualizado',
            life: 3000}
          );
            if(response.data){
              this.articulo.id = response.data[0].id;
            }
            this.articulos[this.encontrarIndexPorId(this.articulo.id)] = this.articulo;
            this.articuloDialog = false;
            this.articulo = new Articulo();
            this.confirmado = false;
            this.formArticulo.reset();
        },
        () => {
          this.messageService.add(
            {
              severity:'danger', 
              summary: 'Error', 
              detail: 'El artículo no se pudo crear. Intente nuevamente.', 
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
    this.formArticulo.controls['nombre'].setValue(articulo.nombre);
    this.formArticulo.controls['descripcion'].setValue(articulo.descripcion);
    this.formArticulo.controls['categoria'].setValue(articulo.categoria);
    this.formArticulo.controls['fechaVencimiento'].setValue(articulo.fechaVencimiento);
    this.formArticulo.controls['unidad'].setValue(articulo.unidad);
    this.formArticulo.controls['stock'].setValue(articulo.stock);
    this.articuloDialog = true;
  }

  borrarArticulosSeleccionados(){
    this.confirmationService.confirm({
        message: `¿Estás seguro que queres eliminar los ${this.articulosSeleccionados.length} artículos seleccionados?`,
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
            this.articulosSeleccionados = this.articulosSeleccionados.filter(val => val.id !== articulo.id)
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

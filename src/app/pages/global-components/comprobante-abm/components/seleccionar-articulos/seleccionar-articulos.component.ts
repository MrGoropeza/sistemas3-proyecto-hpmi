import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { SupabaseArticulosService } from 'src/app/services/articulos/supabase-articulos.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-seleccionar-articulos',
  templateUrl: './seleccionar-articulos.component.html',
  styleUrls: ['./seleccionar-articulos.component.css']
})
export class SeleccionarArticulosComponent implements OnInit{

  articulos: ArticuloView[] = [];

  cantTotalArticulos!: number;

  @Output() articuloSeleccionado = new EventEmitter<ArticuloView>;

  cargando: boolean = false;

  constructor(
    private articulosService: SupabaseArticulosService,
    private proveedoresService: ProveedorService
  ) { }

  ngOnInit(): void {
  }

  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;
    let requestCant = await this.articulosService.getCantArticulos();
    if(requestCant.data){
      this.cantTotalArticulos = requestCant.data.length;
    }

    let request = await this.articulosService.readArticulosView(event);
    if(request.data){
      this.articulos = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  seleccionarArticulo(articulo: ArticuloView){
    this.articuloSeleccionado.emit(articulo);
  }

}

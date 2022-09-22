import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ArticuloComprobante } from 'src/app/models/ArticuloComprobante';
import { ArticuloView } from 'src/app/models/ArticuloView';
import { SupabaseArticulosService } from 'src/app/services/articulos/supabase-articulos.service';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-seleccionar-articulos',
  templateUrl: './seleccionar-articulos.component.html',
  styleUrls: ['./seleccionar-articulos.component.css']
})
export class SeleccionarArticulosComponent implements OnInit{

  articulos: ArticuloComprobante[] = [];

  cantTotalArticulos!: number;

  @Output() articuloSeleccionado = new EventEmitter<ArticuloComprobante>;

  cargando: boolean = false;

  constructor(
    private articulosService: SupabaseArticulosService,
    private comprobanteService: ComprobantesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;
    let requestCant = await this.articulosService.getCantArticulos();
    if(requestCant.data){
      this.cantTotalArticulos = requestCant.data.length;
    }

    let request = await this.comprobanteService.readArticulos(event);
    if(request.data){
      this.articulos = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  seleccionarArticulo(articulo: ArticuloComprobante){
    this.articuloSeleccionado.emit(articulo);
    // if(articulo.cantidad && articulo.precio
    //     && articulo.precio > 0 && articulo.cantidad > 0){
        
    // }else{
    //   this.messageService.add(
    //     {severity:'error', 
    //     summary: 'Error',
    //     detail: 'Ingrese precio y cantidad con valores mayores a 0 antes de agregar un artículo.'}
    //   );
    // }
  }

}

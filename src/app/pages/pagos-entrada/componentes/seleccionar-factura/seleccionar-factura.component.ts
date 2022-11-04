import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Comprobante } from 'src/app/models/Comprobante';
import { ObraSocial } from 'src/app/models/ObraSocial';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-seleccionar-factura',
  templateUrl: './seleccionar-factura.component.html',
  styleUrls: ['./seleccionar-factura.component.css']
})
export class SeleccionarFacturaComponent implements OnInit {

  cargando: boolean = false;
  total : number = 0;
  comprobantes : Comprobante[] = [];

  @Input() idObraSocial! : number;

  @Input() facturasSeleccionadas: Comprobante[] = [];

  @Output() compSeleccionado = new EventEmitter<Comprobante>;
  @Output() compQuitado = new EventEmitter<Comprobante>;
  
  
  constructor(private comprobanteService : ComprobantesService) { }

  ngOnInit(): void {
    this.comprobanteService.setModoEntrada(true);
  }
  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;
    let requestCant = await this.comprobanteService.getCantComprobantes();
    if(requestCant.data){
      this.total = requestCant.data.length;
    }
    let request = await this.comprobanteService.getComprobantes(undefined, event, 5, this.idObraSocial);
    if(request.data){
      console.log(request.data);
      
      this.comprobantes = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  public agregarComprobante(comprobante : Comprobante){
    this.compSeleccionado.emit(comprobante);
  }


  facturaIsSelected(comprobante: Comprobante){
    return this.facturasSeleccionadas.findIndex(fact => fact.idComprobante === comprobante.idComprobante) !== -1;
  }

  public async getComprobantes(){
    // let request = await this.comprobanteService.getComprobantes(this.proveedor);
    // if(request.data){
    //   this.comprobantes = request.data;
    // }else{
    //   console.log(request.error);
    // }
  }

}

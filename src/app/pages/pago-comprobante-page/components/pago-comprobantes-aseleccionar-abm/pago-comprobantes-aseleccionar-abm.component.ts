import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Comprobante } from 'src/app/models/Comprobante';
import { Proveedor } from 'src/app/models/Proveedor';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-pago-comprobantes-aseleccionar-abm',
  templateUrl: './pago-comprobantes-aseleccionar-abm.component.html',
  styleUrls: ['./pago-comprobantes-aseleccionar-abm.component.css']
})
export class PagoComprobantesASeleccionarABMComponent implements OnInit {
  comprobantes : Comprobante[] = [];
  @Input() proveedor! : Proveedor;
  total : number = 0;
  cargando! : boolean;
  @Output() compSeleccionado = new EventEmitter<Comprobante>;
  constructor(private comprobanteService : ComprobantesService) { }

  ngOnInit(): void {
    this.getComprobantes();
  }
  async onLazyLoad(event: LazyLoadEvent){
    this.cargando = true;
    let requestCant = await this.comprobanteService.getCantComprobantes();
    if(requestCant.data){
      this.total = requestCant.data.length;
    }
    let request = await this.comprobanteService.getComprobantes(this.proveedor,event);
    if(request.data){
      this.comprobantes = request.data.filter(element => element.saldo > 0);
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }
  public agregarComprobante(comprobante : Comprobante){
    this.compSeleccionado.emit(comprobante);
  }
  public async getComprobantes(){
    let request = await this.comprobanteService.getComprobantes(this.proveedor);
    if(request.data){
      this.comprobantes = request.data;
    }else{
      console.log(request.error);
    }
  }

}

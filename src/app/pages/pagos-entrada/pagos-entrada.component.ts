import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pago, PagoEntrada } from 'src/app/models/Pago';
import { PagosEntradaService } from 'src/app/services/pagos/pagos-entrada.service';

@Component({
  selector: 'app-pagos-entrada',
  templateUrl: './pagos-entrada.component.html',
  styleUrls: ['./pagos-entrada.component.css']
})
export class PagosEntradaComponent implements OnInit {

  pagos: PagoEntrada[] = [];
  cantPagos: number = 0;
  loading: boolean = true;

  pagosDialog: boolean = false;

  constructor(
    private pagoService: PagosEntradaService
  ) { }

  ngOnInit(): void {

  }

  async onLazyLoad(event: LazyLoadEvent){
    this.loading = true;

    let requestCant = await this.pagoService.getCantPagos();
    if(requestCant.data){
      this.cantPagos = requestCant.data.length;
    }else{
      console.log(requestCant.error);
    }

    let request = await this.pagoService.getPagos(event);
    if(request.data){
      this.pagos = request.data;
    }else{
      console.log(request.error);
    }

    this.loading = false;
  }

  agregar(){

  }

  verDetalle(pago: Pago){

  }

  delete(pago: Pago){

  }

}

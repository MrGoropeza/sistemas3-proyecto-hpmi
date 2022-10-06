import { Component, Input, OnInit } from '@angular/core';
import { DetallePago } from 'src/app/models/DetallePago';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';
import { PagosService } from 'src/app/services/pagos/pagos.service';

@Component({
  selector: 'app-pago-comprobante-abm',
  templateUrl: './pago-comprobante-abm.component.html',
  styleUrls: ['./pago-comprobante-abm.component.css']
})
export class PagoComprobanteABMComponent implements OnInit {
  detalles : DetallePago[] =[];
  cargando  : boolean = true;
  @Input() idPago! : number;
  constructor(private servicioPago : PagosService) { }

  ngOnInit(): void {
    this.getDetalles();
  }
  public getDetalles(){
    this.servicioPago.getDetalles(this.idPago).then(
     (res)=>{
      if(res.data){
        console.log(res.data); 
        this.detalles = res.data;
        this.cargando = false;
      }
     }
    );
  }

}

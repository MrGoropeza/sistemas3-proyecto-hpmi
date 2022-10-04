import { Component, OnInit } from '@angular/core';
import { DetallePago } from 'src/app/models/DetallePago';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-pago-comprobante-abm',
  templateUrl: './pago-comprobante-abm.component.html',
  styleUrls: ['./pago-comprobante-abm.component.css']
})
export class PagoComprobanteABMComponent implements OnInit {
  detalles : DetallePago[] =[];
  cargando  : boolean = true;
  constructor(private servicioComprobantes : ComprobantesService) { }

  ngOnInit(): void {
  }
  public getComprobantes(){
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Comprobante } from 'src/app/models/Comprobante';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-factura-page',
  templateUrl: './factura-page.component.html',
  styleUrls: ['./factura-page.component.css']
})
export class FacturaPageComponent implements OnInit {
  facturas : Comprobante[] = [];
  constructor(private comprobanteServicio : ComprobantesService) { }

  ngOnInit(): void {
    this.getFacturas();
  }
  public getFacturas(){
    this.comprobanteServicio.getComprobante(1).subscribe(
      (comprobantes)=>{
        this.facturas = comprobantes;
      }
    );
  }
}

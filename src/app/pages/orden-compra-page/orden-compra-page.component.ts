import { Component, OnInit } from '@angular/core';
import { Comprobante } from 'src/app/models/Comprobante';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-orden-compra-page',
  templateUrl: './orden-compra-page.component.html',
  styleUrls: ['./orden-compra-page.component.css']
})
export class OrdenCompraPageComponent implements OnInit {
  ordenesCompra : Comprobante[] = [];
  constructor(private comprobanteServicio : ComprobantesService) { }

  ngOnInit(): void {
    this.getOrdenes();
  }
  public getOrdenes(){
    this.comprobanteServicio.getComprobante(2).subscribe(
      (comprobantes)=>{
        console.log(comprobantes);
        this.ordenesCompra = comprobantes;
      }
    );
  }

}

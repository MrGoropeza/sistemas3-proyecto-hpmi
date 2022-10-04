import { Component, Input, OnInit } from '@angular/core';
import { DetalleComprobante } from 'src/app/models/DetalleComprobante';

@Component({
  selector: 'app-pago-articulos-abm',
  templateUrl: './pago-articulos-abm.component.html',
  styleUrls: ['./pago-articulos-abm.component.css']
})
export class PagoArticulosABMComponent implements OnInit {
  @Input() idPago! : number;
  cargando : boolean = true;
  detalles : DetalleComprobante [] = [];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { DetalleComprobante } from 'src/app/models/DetalleComprobante';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-detalle-comprobante-entrada',
  templateUrl: './detalle-comprobante-entrada.component.html',
  styleUrls: ['./detalle-comprobante-entrada.component.css']
})
export class DetalleComprobanteEntradaComponent implements OnInit {

  detalles : DetalleComprobante [] = [];
  @Input() idComprobante! : number;
  cargando : boolean = true;

  constructor(
    private comprobanteServicio : ComprobantesService
  ) { }

  ngOnInit(): void {
  }

}

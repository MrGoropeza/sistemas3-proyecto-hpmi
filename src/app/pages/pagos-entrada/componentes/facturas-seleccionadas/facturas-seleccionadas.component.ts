import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comprobante } from 'src/app/models/Comprobante';

@Component({
  selector: 'app-facturas-seleccionadas',
  templateUrl: './facturas-seleccionadas.component.html',
  styleUrls: ['./facturas-seleccionadas.component.css']
})
export class FacturasSeleccionadasComponent implements OnInit {

  @Input() idObraSocial!: number;

  @Input() facturasSeleccionadas!: Comprobante[];
  @Output() facturasSeleccionadasChange = new EventEmitter<Comprobante[]>();

  @Output() seleccionarFactura = new EventEmitter();
  @Output() quitarFactura = new EventEmitter<Comprobante>();

  @Output() subtotal = new EventEmitter<number>();

  dialogFacturas: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  actualizarSubtotal() {
    let sub = 0;
    this.facturasSeleccionadas.forEach(
      factura => {
        if(factura.subTotal){
          sub += factura.subTotal;
        }
      }
    );
    this.subtotal.emit(sub);
  }

  comprobanteSeleccionado(comprobante: Comprobante) {
    this.facturasSeleccionadas.push(comprobante);
    this.facturasSeleccionadasChange.emit(this.facturasSeleccionadas);
    this.actualizarSubtotal();
  }

  combQuitado(comprobante: Comprobante){
    this.facturasSeleccionadas = this.facturasSeleccionadas.filter(comp => comp.idComprobante !== comprobante.idComprobante);
    
    this.actualizarSubtotal();
  }

}

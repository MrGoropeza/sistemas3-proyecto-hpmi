import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pago } from 'src/app/models/Pago';

@Component({
  selector: 'app-pago-detalle-dialog',
  templateUrl: './pago-detalle-dialog.component.html',
  styleUrls: ['./pago-detalle-dialog.component.css']
})
export class PagoDetalleDialogComponent implements OnInit {
  pago : Pago = this.config.data.pago;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    
    
  }
}

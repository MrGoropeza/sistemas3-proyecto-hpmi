import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtencionEncabezado, AtencionView } from 'src/app/models/AtencionDetalles';

@Component({
  selector: 'app-atencion-detalle-dialog',
  templateUrl: './atencion-detalle-dialog.component.html',
  styleUrls: ['./atencion-detalle-dialog.component.css']
})
export class AtencionDetalleDialogComponent implements OnInit {
  atencion : AtencionView = this.config.data.data;
  total : number = 0;
  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
  }
  getTotal(subtotal : number){
    this.total += subtotal;
  }

}

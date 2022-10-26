import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtencionEncabezado } from 'src/app/models/AtencionDetalles';

@Component({
  selector: 'app-atencion-detalle-dialog',
  templateUrl: './atencion-detalle-dialog.component.html',
  styleUrls: ['./atencion-detalle-dialog.component.css']
})
export class AtencionDetalleDialogComponent implements OnInit {
  atencion : AtencionEncabezado = this.config.data.data;
  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
  }

}

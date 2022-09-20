import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-comprobante-dialog',
  templateUrl: './comprobante-dialog.component.html',
  styleUrls: ['./comprobante-dialog.component.css']
})
export class ComprobanteDialogComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.ref.close();
  }

  guardar(){}

}

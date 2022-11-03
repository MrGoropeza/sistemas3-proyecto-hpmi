import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleComprobante, DetalleComprobanteEntrada } from 'src/app/models/DetalleComprobante';
import { AtencionDetalleDialogComponent } from 'src/app/pages/atenciones-page/componentes/atencion-detalle-dialog/atencion-detalle-dialog.component';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-detalle-comprobante-entrada',
  templateUrl: './detalle-comprobante-entrada.component.html',
  styleUrls: ['./detalle-comprobante-entrada.component.css']
})
export class DetalleComprobanteEntradaComponent implements OnInit {

  detalles : DetalleComprobanteEntrada [] = [];
  @Input() idComprobante! : number;
  cargando : boolean = true;

  ref!: DynamicDialogRef;

  constructor(
    private comprobanteServicio : ComprobantesService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getDetalles();
  }

  async getDetalles(){
    this.cargando = true;
    let request = await this.comprobanteServicio.getDetalleEntrada(this.idComprobante);
    if(request.data){this.detalles = request.data; console.log(request.data);}
    else{console.log(request.error); return;}
    this.cargando = false;
  }

  verDetalle(atencion : DetalleComprobanteEntrada){
    this.ref = this.dialogService.open(AtencionDetalleDialogComponent, {
      header: `Atención # ${atencion.idAtencion}`,
      width: "80%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { data : atencion },
    });
  }

}

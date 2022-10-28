import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AtencionEncabezado } from 'src/app/models/AtencionDetalles';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';
import { AtencionDetalleDialogComponent } from '../../atenciones-page/componentes/atencion-detalle-dialog/atencion-detalle-dialog.component';

@Component({
  selector: 'app-detalle-atenciones-abm',
  templateUrl: './detalle-atenciones-abm.component.html',
  styleUrls: ['./detalle-atenciones-abm.component.css']
})
export class DetalleAtencionesABMComponent implements OnInit {
  @Input() id : number = 0;
  @Input() nombre : string = '';
  ref!: DynamicDialogRef;
  atenciones : AtencionEncabezado[] = [];
  cargando : boolean = true;
  constructor(private atencionService : AtencionService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAtenciones();
  }
  async getAtenciones(){
    let request = await this.atencionService.getAtencionesXPersona(this.id,this.nombre);
    if(request.data){
      this.atenciones = request.data;
      this.cargando = false;
    }
  }
  verDetalle(atencion : AtencionEncabezado){
    this.ref = this.dialogService.open(AtencionDetalleDialogComponent, {
      header: `Atención # ${atencion.idAtencion}`,
      width: "85%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { data : atencion },
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { AtencionDetalleArticulo } from 'src/app/models/AtencionDetalles';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';

@Component({
  selector: 'app-atencion-detalle-articulos-abm',
  templateUrl: './atencion-detalle-articulos-abm.component.html',
  styleUrls: ['./atencion-detalle-articulos-abm.component.css']
})
export class AtencionDetalleArticulosABMComponent implements OnInit {
  @Input() idAtencion : number = 0;
  articulos : AtencionDetalleArticulo[] = [];
  cargando : boolean = true;
  constructor(private atencionService : AtencionService) { }

  ngOnInit(): void {
    this.getArticulos();
  }
  async getArticulos(){
    let request = await this.atencionService.getAtencionesArticulos(this.idAtencion);
    if(request.data){
      this.articulos = request.data;
      this.cargando = false;
    }
  }

}

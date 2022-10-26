import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  total : number = 0;
  @Output() totalEmitter = new EventEmitter<number>();
  constructor(private atencionService : AtencionService) { }

  ngOnInit(): void {
    this.getArticulos();
  }
  private getTotal(){
    let sum = 0;
    this.articulos.forEach(element => {
      sum += element.cantidadArticulo * element.precioArticulo;
    });
    this.total = sum;
  }
  async getArticulos(){
    let request = await this.atencionService.getAtencionesArticulos(this.idAtencion);
    if(request.data){
      this.articulos = request.data;
      this.getTotal();
      this.totalEmitter.emit(this.total);
      this.cargando = false;
    }
  }

}

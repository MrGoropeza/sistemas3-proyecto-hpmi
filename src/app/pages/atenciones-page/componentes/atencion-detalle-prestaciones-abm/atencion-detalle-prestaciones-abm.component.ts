import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtencionDetallePrestacion } from 'src/app/models/AtencionDetalles';
import { AtencionService } from 'src/app/services/atenciones/atencion.service';

@Component({
  selector: 'app-atencion-detalle-prestaciones-abm',
  templateUrl: './atencion-detalle-prestaciones-abm.component.html',
  styleUrls: ['./atencion-detalle-prestaciones-abm.component.css']
})
export class AtencionDetallePrestacionesABMComponent implements OnInit {
  @Input() idAtencion : number = 0;
  prestaciones : AtencionDetallePrestacion[] = [];
  cargando : boolean = true;
  total : number = 0;
  @Output() totalEmitter = new EventEmitter<number>();
  constructor(private atencionService : AtencionService) { }

  ngOnInit(): void {
    this.getPrestaciones();
  }
  private getTotal(){
    let sum = 0;
    this.prestaciones.forEach(element => {
      sum +=  element.precioPrestacion;
    });
    this.total = sum;
  }
  async getPrestaciones(){
    let request = await this.atencionService.getAtencionesPrestaciones(this.idAtencion);
    if(request.data){
      this.prestaciones = request.data;
      this.getTotal();
      this.totalEmitter.emit(this.total);
      this.cargando = false;
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { DetalleComprobante } from 'src/app/models/DetalleComprobante';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-articulo-comprobante-abm',
  templateUrl: './articulo-comprobante-abm.component.html',
  styleUrls: ['./articulo-comprobante-abm.component.css']
})
export class ArticuloComprobanteABMComponent implements OnInit {
  detalles : DetalleComprobante [] = [];
  @Input() idComprobante! : number;
  cargando : boolean = true;
  constructor(private comprobanteServicio : ComprobantesService) { }

  ngOnInit(): void {
    this.getDetalle();
  }
  private getDetalle(){
    this.comprobanteServicio.getDetalle(this.idComprobante).then(
      (res)=>{
        console.log("Detalles:", res.data);
        
        if(res.data){
          this.detalles = res.data;
          this.cargando = false;
        }
      }
    );
  }

}

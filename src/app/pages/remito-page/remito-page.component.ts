import { Component, OnInit } from '@angular/core';
import { Comprobante } from 'src/app/models/Comprobante';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-remito-page',
  templateUrl: './remito-page.component.html',
  styleUrls: ['./remito-page.component.css']
})
export class RemitoPageComponent implements OnInit {
  remitos : Comprobante[] = [];
  constructor(private comprobanteServicio : ComprobantesService) { }

  ngOnInit(): void {
    this.getRemitos();
  }
  public getRemitos(){
    this.comprobanteServicio.getComprobante(3).subscribe(
      (comprobantes)=>{
        console.log(comprobantes);
        this.remitos = comprobantes;
      }
    );
  }

}

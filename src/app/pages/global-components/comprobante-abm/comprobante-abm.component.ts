import { Component, Input, OnInit } from '@angular/core';
import { Comprobante } from 'src/app/models/Comprobante';
import { ComprobantesService } from 'src/app/services/comprobantes/comprobantes.service';

@Component({
  selector: 'app-comprobante-abm',
  templateUrl: './comprobante-abm.component.html',
  styleUrls: ['./comprobante-abm.component.css']
})
export class ComprobanteABMComponent implements OnInit {
  @Input() comprobantes! : Comprobante[];
  @Input() titulo! : string;
  constructor() { }

  ngOnInit(): void {
    
  }
  

}

import { Component, Input, OnInit } from '@angular/core';
import { IDeposito } from 'src/app/models/IDeposito';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
 @Input() deposito : IDeposito = {} as IDeposito;
  dialogVisible : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  mostrar(){
    this.dialogVisible = true;
  }
}

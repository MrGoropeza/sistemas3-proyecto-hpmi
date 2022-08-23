import { Component, Input, OnInit } from '@angular/core';
import { IDeposito } from 'src/app/models/IDeposito';

@Component({
  selector: 'app-tarjeta-vertical',
  templateUrl: './tarjeta-vertical.component.html',
  styleUrls: ['./tarjeta-vertical.component.css']
})
export class TarjetaVerticalComponent implements OnInit {
  @Input() deposito : IDeposito = {} as IDeposito;
  titulo : string = "";
  dialogVisible : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  mostrar(){
    this.dialogVisible = true;
    this.titulo = "hola";
  }

}

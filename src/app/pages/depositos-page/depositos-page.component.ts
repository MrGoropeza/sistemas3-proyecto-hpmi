import { Component, OnInit } from '@angular/core';
import { IDeposito } from 'src/app/models/IDeposito';
import { DepositoService } from 'src/app/services/deposito.service';

@Component({
  selector: 'app-depositos-page',
  templateUrl: './depositos-page.component.html',
  styleUrls: ['./depositos-page.component.css']
})
export class DepositosPageComponent implements OnInit {
  depositos : IDeposito[] = [];
  display : boolean = false;
  titulo : string  = "";
  constructor(private servicioDepositos : DepositoService) { }

  ngOnInit(): void {
    this.obtenerDepositos();
  }
  obtenerDepositos(){
    this.depositos = this.servicioDepositos.getDepositos();
  }
  agregarDeposito(){
    this.display = true;
    this.titulo = "Agregar nuevo deposito";
  }
}

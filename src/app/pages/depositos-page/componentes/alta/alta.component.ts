import { Component, OnInit } from '@angular/core';
import { ITipoDeposito } from 'src/app/models/ITipoDeposito';
import { DepositoService } from 'src/app/services/deposito.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  tipoDepositos : ITipoDeposito[] = [];
  tipoDepositoSeleccionado : string  ="";
  constructor(private DepositoServicio : DepositoService) { }

  ngOnInit(): void {
    this.obtenerTiposDepositos();
  }
  obtenerTiposDepositos(){
    this.tipoDepositos = this.DepositoServicio.getTipoDepositos();
  }

}

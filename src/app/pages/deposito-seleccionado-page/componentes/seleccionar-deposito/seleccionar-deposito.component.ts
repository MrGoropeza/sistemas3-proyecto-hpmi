import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Deposito } from 'src/app/models/Deposito';
import { SupabaseDepositoSeleccionadoService } from 'src/app/services/deposito-seleccionado/supabase-deposito-seleccionado.service';
import { DepositoService } from 'src/app/services/deposito/deposito.service';

@Component({
  selector: 'app-seleccionar-deposito',
  templateUrl: './seleccionar-deposito.component.html',
  styleUrls: ['./seleccionar-deposito.component.css']
})
export class SeleccionarDepositoComponent implements OnInit {

  @Input() idDepositoActual!: number;

  cargando: boolean = false;
  depositos!: Deposito[];
  @Output() depositoSeleccionado = new EventEmitter<Deposito>;
  cantTotalDepositos!: number;

  constructor(
    private depositoService: SupabaseDepositoSeleccionadoService
  ) { }

  ngOnInit(): void {
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;

    let request = await this.depositoService.getDepositosDestinos(this.idDepositoActual)
    if(request.data){
      this.depositos = request.data;
      this.cantTotalDepositos = request.data.length;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  seleccionarDeposito(deposito: Deposito) {
    this.depositoSeleccionado.emit(deposito);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'app-cliente-detalle-tab-view',
  templateUrl: './cliente-detalle-tab-view.component.html',
  styleUrls: ['./cliente-detalle-tab-view.component.css']
})
export class ClienteDetalleTabViewComponent implements OnInit,OnDestroy {
  cliente! : Cliente;
  suscripcion! : Subscription;
  constructor(private clienteService : ClienteService) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
  
  ngOnInit(): void {
    this.suscripcion = this.clienteService.getcliente().pipe(
      map((cliente)=>{
        this.cliente = cliente;

      })
    ).subscribe();
  }

}

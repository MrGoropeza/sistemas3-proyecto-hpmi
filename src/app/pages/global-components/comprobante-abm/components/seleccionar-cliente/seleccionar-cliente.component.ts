import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.css']
})
export class SeleccionarClienteComponent implements OnInit {

  cargando: boolean = false;
  clientes!: Cliente[];
  @Output() clienteSeleccionado = new EventEmitter<Cliente>;
  cantTotalClientes!: number;

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.cargando = true;
    let requestCant = await this.clienteService.getCantClientes();
    if(requestCant.data){
      this.cantTotalClientes = requestCant.data.length;
    }

    let request = await this.clienteService.getClientes(event);
    if(request.data){
      this.clientes = request.data;
      this.cargando = false;
    }else{
      console.log(request.error);
    }
  }

  seleccionarCliente(cliente: Cliente){
    this.clienteSeleccionado.emit(cliente);
  }

}

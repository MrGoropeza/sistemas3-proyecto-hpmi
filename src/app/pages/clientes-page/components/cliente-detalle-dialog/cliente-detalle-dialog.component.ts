import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'app-cliente-detalle-dialog',
  templateUrl: './cliente-detalle-dialog.component.html',
  styleUrls: ['./cliente-detalle-dialog.component.css']
})
export class ClienteDetalleDialogComponent implements OnInit {
  cliente : Cliente = this.config.data.cliente;
  icono! : string;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private clienteService : ClienteService
  ) { }

  ngOnInit(): void {
    this.clienteService.setCliente(this.cliente);
    this.cliente.tipoPersona == "juridica"?
    this.icono = "bi bi-building" :
    this.icono = "bi bi-person-circle" 
  }

}

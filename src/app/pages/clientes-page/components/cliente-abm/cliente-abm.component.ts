import { Component, OnInit } from "@angular/core";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs";
import { Cliente } from "src/app/models/Cliente";
import { ClienteService } from "src/app/services/clientes/cliente.service";
import { ClienteDetalleDialogComponent } from "../cliente-detalle-dialog/cliente-detalle-dialog.component";
import { ClienteNuevoDialogComponent } from "../cliente-nuevo-dialog/cliente-nuevo-dialog.component";

@Component({
  selector: "app-cliente-abm",
  templateUrl: "./cliente-abm.component.html",
  styleUrls: ["./cliente-abm.component.css"],
})
export class ClienteABMComponent implements OnInit {
  clientes: Cliente[] = [];
  cantClientes: Number = 0;
  total!: number;
  loading!: boolean;
  ref!: DynamicDialogRef;
  constructor(
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }
  public async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    let requestCant = await this.clienteService.getClientes();
    if (requestCant.data) {
      this.total = requestCant.data.length;
    }
    let request = await this.clienteService.getClientes(event);
    if (request.data) {
      this.clientes = request.data;
      this.cantClientes = this.clientes.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
  public aniadir() {
    this.ref = this.dialogService.open(ClienteNuevoDialogComponent,{
      header: "Añadir Proveedor",
      width: "40rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { cliente: {} as Cliente} 
    }
    );
    this.ref.onClose.pipe(
      map((res)=>{
        this.clientes.push(res);
      })
    ).subscribe();
  }
  public editar(cliente: Cliente) {
    this.dialogService.open(ClienteNuevoDialogComponent,{
      header: "Editar Proveedor",
      width: "40rem",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { cliente: cliente} 
    })
  }
  public verDetalle(cliente: Cliente) {
    let nombre = "";
    cliente.tipoPersona == "juridica"
      ? (nombre = cliente.nombre)
      : (nombre = cliente.apellido + ", " + cliente.nombre);
    this.ref = this.dialogService.open(ClienteDetalleDialogComponent, {
      header: `${nombre}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { cliente: cliente },
    });
  }
  public eliminar(idCliente: number) {

  }
  public async getClientes(): Promise<void> {
    let request = await this.clienteService.getClientes();
    if (request.data) {
      this.clientes = request.data;
      this.total = this.clientes.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
}

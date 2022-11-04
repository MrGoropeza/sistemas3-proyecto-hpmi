import { Component, OnInit } from "@angular/core";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Pago, PagoEntrada } from "src/app/models/Pago";
import { PagosEntradaService } from "src/app/services/pagos/pagos-entrada.service";
import { PagoDetalleDialogComponent } from "../pago-comprobante-page/components/pago-detalle-dialog/pago-detalle-dialog.component";
import { PagoEntradaDetalleDialogComponent } from "./componentes/pago-entrada-detalle-dialog/pago-entrada-detalle-dialog.component";
import { PagoEntradaDialogComponent } from "./componentes/pago-entrada-dialog/pago-entrada-dialog.component";

@Component({
  selector: "app-pagos-entrada",
  templateUrl: "./pagos-entrada.component.html",
  styleUrls: ["./pagos-entrada.component.css"],
})
export class PagosEntradaComponent implements OnInit {
  pagos: PagoEntrada[] = [];
  cantPagos: number = 0;
  loading: boolean = true;
  ref!: DynamicDialogRef;
  pagosDialog: boolean = false;

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private pagoService: PagosEntradaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;

    let requestCant = await this.pagoService.getCantPagos();
    if (requestCant.data) {
      this.cantPagos = requestCant.data.length;
    } else {
      console.log(requestCant.error);
    }

    let request = await this.pagoService.getPagos(event);
    if (request.data) {
      this.pagos = request.data;
    } else {
      console.log(request.error);
    }

    this.loading = false;
  }

  agregar() {}

  verDetalle(pago: PagoEntrada) {
    this.ref = this.dialogService.open(PagoEntradaDetalleDialogComponent, {
      header: `Pago #${pago.nroComprobante}`,
      width: "80%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { pago: pago },
    });
  }

  public delete(pago: PagoEntrada) {
    this.confirmationService.confirm({
      message: "¿Estás seguro que desea borrar este pago?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.pagoService.delete(pago.idPago).then((res) => {
          if (res.data) {
            this.onLazyLoad({first: 1,rows:5});
          }
        });

        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Pago eliminado",
          life: 3000,
        });
      },
    });
  }
}

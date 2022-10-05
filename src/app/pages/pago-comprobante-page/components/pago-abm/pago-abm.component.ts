import { Component, OnInit } from "@angular/core";
import { LazyLoadEvent, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Pago } from "src/app/models/Pago";
import { ComprobanteDialogComponent } from "src/app/pages/global-components/comprobante-abm/components/comprobante-dialog/comprobante-dialog.component";
import { PagosService } from "src/app/services/pagos/pagos.service";
import { PagoDetalleDialogComponent } from "../pago-detalle-dialog/pago-detalle-dialog.component";
import { PagoNuevoDialogComponent } from "../pago-nuevo-dialog/pago-nuevo-dialog.component";

@Component({
  selector: "app-pago-abm",
  templateUrl: "./pago-abm.component.html",
  styleUrls: ["./pago-abm.component.css"],
})
export class PagoABMComponent implements OnInit {
  pagos: Pago[] = [];
  cantPagos: Number = 0;
  loading: boolean = true;
  ref!: DynamicDialogRef;
  constructor(
    private pagoService: PagosService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPagos();
  }
  public async getPagos() {
    let request = await this.pagoService.getPagos();
    if (request.data) {
      this.pagos = request.data;
      this.cantPagos = this.pagos.length;
      console.log(this.pagos);
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
  public aniadir() {
    this.ref = this.dialogService.open(PagoNuevoDialogComponent,{
      header: `Añadir pago`,
      width: "90%",
      height: "90%",
      contentStyle: {"overflow":"auto",},
    });
  }
  public verDetalle(pago: Pago) {
    this.ref = this.dialogService.open(PagoDetalleDialogComponent, {
      header: `Pago #${pago.nroComprobante}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: {pago : pago}
    });
  }

  async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;

    let request = await this.pagoService.getPagos(event);
    if (request.data) {
      this.pagos = request.data;
      this.cantPagos = this.pagos.length;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
}

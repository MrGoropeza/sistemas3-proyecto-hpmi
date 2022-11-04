import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Pago, PagoEntrada } from "src/app/models/Pago";

@Component({
  selector: "app-pago-entrada-detalle-dialog",
  templateUrl: "./pago-entrada-detalle-dialog.component.html",
  styleUrls: ["./pago-entrada-detalle-dialog.component.css"],
})
export class PagoEntradaDetalleDialogComponent implements OnInit {
  pago: PagoEntrada = this.config.data.pago;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {}
}

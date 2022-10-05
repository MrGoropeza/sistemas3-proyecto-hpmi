import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Comprobante } from "src/app/models/Comprobante";

@Component({
  selector: "app-detalle-comprobante",
  templateUrl: "./detalle-comprobante.component.html",
  styleUrls: ["./detalle-comprobante.component.css"],
})
export class DetalleComprobanteComponent implements OnInit {
  comprobante : Comprobante = this.config.data.comprobante;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    console.log(this.comprobante);
    
  }
}

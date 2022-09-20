import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs";
import { Comprobante } from "src/app/models/Comprobante";
import { ComprobantesService } from "src/app/services/comprobantes/comprobantes.service";
import { ComprobanteDialogComponent } from "./components/comprobante-dialog/comprobante-dialog.component";
import { DetalleComprobanteComponent } from "./components/detalle-comprobante/detalle-comprobante.component";

@Component({
  selector: "app-comprobante-abm",
  templateUrl: "./comprobante-abm.component.html",
  styleUrls: ["./comprobante-abm.component.css"],
})
export class ComprobanteABMComponent implements OnInit {
  @Input() comprobantes!: Comprobante[];
  @Input() titulo!: string;
  @Input() idTipoComprobante!: number;

  ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private comprobanteServicio: ComprobantesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getComprobantes();
  }

  public getComprobantes() {
    this.comprobanteServicio
      .getComprobante(this.idTipoComprobante)
      .subscribe((comprobantes) => {
        console.log(comprobantes);
        this.comprobantes = comprobantes;
      });
  }
  public verDetalle(comprobante : Comprobante) {
    this.ref = this.dialogService.open(DetalleComprobanteComponent, {
      header: `${this.titulo} #${comprobante.idComprobante}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: {comprobante : comprobante}
    });
  }
  aniadir() {
    this.ref = this.dialogService.open(ComprobanteDialogComponent, {
      header: `Añadir ${this.titulo}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { comprobante: {} as Comprobante },
    });
    this.ref.onClose
      .pipe(
        map((result) => {
          if (result) {
            this.messageService.add({
              severity: "success",
              summary: "Éxito",
              detail: "¡Proveedor modificado con exito!",
              life: 3000,
            });
          }
        })
      )
      .subscribe();
  }
}

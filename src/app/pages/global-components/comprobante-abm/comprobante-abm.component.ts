import { Component, Input, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs";
import { Comprobante } from "src/app/models/Comprobante";
import { ComprobantesService } from "src/app/services/comprobantes/comprobantes.service";
import { PedidosService } from "src/app/services/pedidos/pedidos.service";
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
  @Input() isComprobanteEntrada: boolean = false;

  ref!: DynamicDialogRef;

  loading: boolean = true;

  constructor(
    private dialogService: DialogService,
    private comprobanteServicio: ComprobantesService,
    private pedidosService: PedidosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.comprobanteServicio.setModoEntrada(this.isComprobanteEntrada);
    this.getComprobantes();
  }

  public getComprobantes() {
    let request = this.comprobanteServicio
      .getComprobante(this.idTipoComprobante)
      .subscribe((comprobantes) => {
        this.loading = true;
        this.comprobantes = comprobantes;
        this.loading = false;
        request.unsubscribe();
      });
  }

  public verDetalle(comprobante : Comprobante) {
    this.ref = this.dialogService.open(DetalleComprobanteComponent, {
      header: `${this.titulo} #${comprobante.idComprobante}`,
      width: "80%",
      contentStyle: { overflow: "auto" },
      data: {comprobante : comprobante, isEntrada: this.isComprobanteEntrada}
    });
  }

  aniadir() {
    this.ref = this.dialogService.open(ComprobanteDialogComponent, {
      header: `A??adir ${this.titulo}`,
      width: "90%",
      height: "90%",
      contentStyle: {"overflow":"auto",},
      data: { 
        comprobante: {} as Comprobante, 
        idTipoComprobante: this.idTipoComprobante,
        isEntrada: this.isComprobanteEntrada
      },
    });
    this.ref.onClose
      .pipe(
        map((result) => {
          this.getComprobantes();
        })
      )
      .subscribe();
  }
  

  async eliminar(comprobante: Comprobante) {
    let request = await this.comprobanteServicio.removeComprobante(comprobante);

    if(request.error){
      console.log(request.error);
    }else{
      this.getComprobantes();
    }
  }
}

import { Component, OnInit } from "@angular/core";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { map } from "rxjs";
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
  cantPagos: number = 0;
  loading: boolean = true;
  ref!: DynamicDialogRef;
  total!: number;
  constructor(
    private confirmationService: ConfirmationService,
    private pagoService: PagosService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // this.getPagos();
  }
  public async getPagos() {
    let request = await this.pagoService.getPagos();

    let requestCant = await this.pagoService.getCantPagos();

    if(requestCant.data){
      this.cantPagos = requestCant.data.length;
    }

    if (request.data) {
      this.pagos = request.data;
      // console.log(this.pagos);
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
  public aniadir() {
    this.ref = this.dialogService.open(PagoNuevoDialogComponent, {
      header: `Añadir pago`,
      width: "90%",
      height: "90%",
      contentStyle: { overflow: "auto" },
    });
    this.ref.onClose.pipe(
      map(res=>{
        this.getPagos();
      })
    ).subscribe();
  }
  public verDetalle(pago: Pago) {
    this.ref = this.dialogService.open(PagoDetalleDialogComponent, {
      header: `Pago #${pago.nroComprobante}`,
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      data: { pago: pago },
    });
  }
  public delete(pago: Pago) {
    this.confirmationService.confirm({
      message: "¿Estás seguro que desea borrar este pago?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.pagoService.delete(pago.idPago).then((res) => {
          if (res.data) {
            this.getPagos();
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

  async onLazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    let requestCant = await this.pagoService.getCantPagos();
    if(requestCant.data){
      this.cantPagos = requestCant.data.length;
      console.log(this.cantPagos);
    }else{
      console.log(requestCant.error);
      
    }


    let request = await this.pagoService.getPagos(event);
    if (request.data) {
      this.pagos = request.data;
      this.loading = false;
    } else {
      console.log(request.error);
    }
  }
}

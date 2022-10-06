import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { SubscriptionLike } from "rxjs";
import { ArticuloComprobante } from "src/app/models/ArticuloComprobante";
import { Comprobante } from "src/app/models/Comprobante";
import { Proveedor } from "src/app/models/Proveedor";
import { DetallePago } from "src/app/models/DetallePago";
import { PagosService } from "src/app/services/pagos/pagos.service";
import { MetPago } from "src/app/models/MetPago";
import { Pago } from "src/app/models/Pago";

@Component({
  selector: "app-pago-nuevo-dialog",
  templateUrl: "./pago-nuevo-dialog.component.html",
  styleUrls: ["./pago-nuevo-dialog.component.css"],
})
export class PagoNuevoDialogComponent implements OnInit {
  idTipoComprobante!: number;
  proveedor!: Proveedor;
  importe!: number;
  metodosPago: MetPago[] = [];
  metPagoSeleccionado: MetPago = {} as MetPago;
  proveedoresSub!: SubscriptionLike;
  comprobantesSeleccionados: DetallePago[] = [];
  subtotal: number = 0;
  nroPago: string = "";
  comprobantesVisible: boolean = false;
  proveedoresVisible: boolean = false;

  formComprobante: FormGroup = this.formBuilder.group({
    proveedor: [null, Validators.required],
    cantComprobantes: [0, Validators.min(1)],
    comprobantesValidos: [this.comprobantesSeleccionados, Validators.required],
    metPago: ["", Validators.required],
  });

  constructor(
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private pagoServicio: PagosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.genNroFactura();
    this.formComprobante.addControl(
      "nroComprobante",
      new FormControl(
        { value: this.nroPago, disabled: true },
        Validators.required
      )
    );
    this.getMetodosPago();
    console.log(this.metodosPago);
  }

  actualizarSubtotal(importe: number) {
    this.subtotal += importe;
  }

  public getMetodosPago(): void {
    this.pagoServicio.getMetPago().then((res) => {
      if (res.MetodosPago) {
        this.metodosPago = res.MetodosPago;
      } else {
        console.log(res.error);
      }
    });
  }

  proveedorSeleccionado(proveedor: Proveedor) {
    if (this.proveedor) {
      if (this.proveedor.idProveedor != proveedor.idProveedor) {
        this.comprobantesSeleccionados = [];
      }
    }
    this.proveedor = proveedor;
    this.formComprobante.controls["proveedor"].setValue(proveedor);
    this.proveedoresVisible = false;
  }

  agregarComprobante() {
    if (this.proveedor) {
      this.comprobantesVisible = true;
    } else {
      this.showWarn(
        "Advertencia",
        "debe seleccionar un proveedor para continuar..."
      );
    }
  }
  showWarn(resumen: string, detalle: string) {
    this.messageService.add({
      severity: "warn",
      summary: resumen,
      detail: detalle,
    });
  }
  quitarComprobante(detalle: DetallePago) {
    let nuevoArray = this.comprobantesSeleccionados.filter(
      (element) =>
        element.comprobante.idComprobante !== detalle.comprobante.idComprobante
    );
    this.comprobantesSeleccionados = nuevoArray;
    if (detalle.importe) {
      this.subtotal -= detalle.importe;
      console.log(this.subtotal);
    }
  }

  cerrar() {
    this.formComprobante.reset();
    this.ref.close();
  }
  comprobanteSeleccionado(comprobante: Comprobante) {
    let encontrado = this.comprobantesSeleccionados.find(
      (element) =>
        element.comprobante.idComprobante === comprobante.idComprobante
    );
    let detalle = {} as DetallePago;
    detalle.comprobante = comprobante;
    console.log(encontrado);
    if (encontrado === undefined) {
      this.formComprobante.controls["comprobantesValidos"].setValue(
        this.comprobantesSeleccionados
      );
      this.comprobantesSeleccionados.push(detalle);
      this.formComprobante.controls["cantComprobantes"].setValue(
        this.comprobantesSeleccionados.length
      );
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No se puede añadir la misma factura mas de una vez",
      });
    }
  }
  async guardar() {
    this.formComprobante.controls["comprobantesValidos"].setValue(
      this.comprobantesSeleccionados
    );
    this.formComprobante.markAllAsTouched();

    if (this.formComprobante.valid) {
      this.pagoServicio
        .insertPagos(
          this.metPagoSeleccionado.idMetPago,
          this.comprobantesSeleccionados,
          this.proveedor.idProveedor,
          this.subtotal,
          this.nroPago
        )
        .then((res) => {
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "Pago registrado con Exito!",
            life: 3000,
          });
          this.ref.close();
        });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No se puede registrar este pago",
      });
    }
  }

  private genNroFactura() {
    let sucursal = (
      Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    ).toString();
    this.nroPago = sucursal + "-" + this.formatDate(new Date());
  }
  private padToNDigits(num: number, n: number) {
    return num.toString().padStart(n, "0");
  }

  private formatDate(date: Date) {
    return (
      date.getFullYear() +
      this.padToNDigits(date.getMonth() + 1, 2) +
      this.padToNDigits(date.getDate(), 1)
    );
  }
}

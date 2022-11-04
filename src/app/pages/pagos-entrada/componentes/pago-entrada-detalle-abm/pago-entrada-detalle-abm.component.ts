import { Component, Input, OnInit } from "@angular/core";
import { DetallePago } from "src/app/models/DetallePago";
import { PagosEntradaService } from "src/app/services/pagos/pagos-entrada.service";

@Component({
  selector: "app-pago-entrada-detalle-abm",
  templateUrl: "./pago-entrada-detalle-abm.component.html",
  styleUrls: ["./pago-entrada-detalle-abm.component.css"],
})
export class PagoEntradaDetalleABMComponent implements OnInit {
  detalles: DetallePago[] = [];
  cargando: boolean = true;
  @Input() idPago!: number;
  constructor(private servicioPago: PagosEntradaService) {}

  ngOnInit(): void {
    this.getDetalles();
  }
  public getDetalles() {
    this.servicioPago.getDetalles(this.idPago).then((res) => {
      if (res.data) {
        console.log(res.data);
        this.detalles = res.data;
        this.cargando = false;
      }
    });
  }
}
